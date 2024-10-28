
import { ClinicalTrial } from "../models/ClinicalTrials.model.js";

const getCountryFacilityCount = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; 
        const limit = parseInt(req.query.limit) || 10; 
        const skip = (page - 1) * limit; 
        
        // Aggregate to count facilities per country with pagination
        const result = await ClinicalTrial.aggregate([
            {
                $group: {
                    _id: "$country", 
                    facilityCount: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    country: "$_id",
                    facilityCount: 1
                }
            },
            { $skip: skip },
            { $limit: limit }
        ]);

        // Get total unique countries for pagination
        const totalCountries = await ClinicalTrial.distinct("country").then(countries => countries.length);

        // Format result as an array of objects with country and facilityCount
        const formattedResult = result.map(item => ({
            country: item.country,
            facilityCount: item.facilityCount
        }));

        return res.status(200).json({
            totalCountries,
            page,
            limit,
            totalPages: Math.ceil(totalCountries / limit),
            countries: formattedResult
        });
    } catch (error) {
        console.error('Error fetching country facility counts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getTopCities = async (req, res) => {
    try {
        const result = await ClinicalTrial.aggregate([
            {
                $group: {
                    _id: "$city", 
                    facilityCount: { $sum: 1 } 
                }
            },
            {
                $project: {
                    _id: 0, 
                    city: "$_id", 
                    facilityCount: 1 
                }
            },
            {
                $sort: { facilityCount: -1 } 
            },
            {
                $limit: 10 
            }
        ]);

        // Format result as an array of objects with city and facilityCount
        const formattedResult = result.map(item => ({
            city: item.city,
            facilityCount: item.facilityCount
        }));

        return res.status(200).json(formattedResult); 
    } catch (error) {
        console.error('Error fetching top cities:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const getDemographics = async (req, res) => {
    try {
        // Aggregate facility counts by sex
        const facilityCounts = await ClinicalTrial.aggregate([
            {
                $group: {
                    _id: {
                        facility: "$facility",
                        sex: "$sex"
                    }
                }
            },
            {
                $group: {
                    _id: "$_id.sex",
                    facilityCount: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    sex: "$_id",
                    facilityCount: 1
                }
            }
        ]);

        // Format facilityCounts as an array of objects with name and value
        const sexData = facilityCounts.map(item => ({
            name: item.sex === 'MALE' ? 'Male' : item.sex === 'FEMALE' ? 'Female' : 'All',
            value: item.facilityCount
        }));

        // Define age bins for age distribution
        const ageBins = [
            { min: 1, max: 10 },
            { min: 11, max: 20 },
            { min: 21, max: 30 },
            { min: 31, max: 40 },
            { min: 41, max: 50 },
            { min: 51, max: 60 },
            { min: 61, max: 70 },
            { min: 71, max: 80 },
            { min: 81, max: 90 },
            { min: 91, max: 100 }
        ];

        // Initialize ageDistribution in the desired format
        const ageData = ageBins.map(bin => ({
            name: `${bin.min}-${bin.max}`,
            value: 0
        }));

        // Aggregate age distribution data
        const ageResults = await ClinicalTrial.aggregate([
            {
                $group: {
                    _id: "$facility",
                    minAge: { $min: "$minimumAge" },
                    maxAge: { $max: "$maximumAge" }
                }
            },
            {
                $project: {
                    _id: 0,
                    facility: "$_id",
                    minAge: 1,
                    maxAge: 1
                }
            }
        ]);

        // Calculate counts for each age bin
        ageResults.forEach(facility => {
            ageBins.forEach((bin, index) => {
                if (facility.minAge >= bin.min && facility.minAge <= bin.max) {
                    ageData[index].value++;
                }
                if (facility.maxAge >= bin.min && facility.maxAge <= bin.max) {
                    ageData[index].value++;
                }
            });
        });

        return res.status(200).json({
            sexData,
            ageData
        });
    } catch (error) {
        console.error('Error fetching demographics data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const getClinicalTrialStats = async (req, res) => {
    try {
        // Aggregation pipeline to get unique countries, unique facilities, and average minimum and maximum ages
        const result = await ClinicalTrial.aggregate([
            {
                $group: {
                    _id: null,
                    uniqueCountries: { $addToSet: "$country" },
                    uniqueFacilities: { $addToSet: "$facility" },
                    totalMinimumAge: { $sum: "$minimumAge" },
                    totalMaximumAge: { $sum: "$maximumAge" },
                    count: { $sum: 1 } // Total count of records for calculating averages
                }
            },
            {
                $project: {
                    _id: 0,
                    numUniqueCountries: { $size: "$uniqueCountries" },
                    numUniqueFacilities: { $size: "$uniqueFacilities" },
                    avgMinimumAge: { $divide: ["$totalMinimumAge", "$count"] },
                    avgMaximumAge: { $divide: ["$totalMaximumAge", "$count"] }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No clinical trial data found' });
        }

        // Send response with the aggregated statistics
        return res.status(200).json(result[0]);
    } catch (error) {
        console.error('Error fetching clinical trial stats:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};





export {
    getCountryFacilityCount,
    getTopCities,
    getDemographics,
    getClinicalTrialStats
}
