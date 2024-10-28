import mongoose from "mongoose"
const ClinicalTrialSchema = new mongoose.Schema({
    facility: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false 
    },
    country: {
        type: String,
        required: false
    },
    minimumAge: {
        type: Number, 
    },
    maximumAge: {
        type: Number, 
    },
    sex: {
        type: String,
        enum: ['ALL', 'FEMALE', 'MALE'], 
        required: false
    },
    overallOfficials: [
        {
            name: {
                type: String,
                required: false
            },
            affiliation: {
                type: String,
                required: false
            }
        }
    ]
}, { collection: 'clinicalTrials' }); 

export const ClinicalTrial = mongoose.model('ClinicalTrial', ClinicalTrialSchema);


