import {Router} from "express";
import {getCountryFacilityCount, getTopCities, getDemographics, getClinicalTrialStats } from "../controllers/ClinicalTrials.controllers.js";

const router = Router();
router.route("/locations").get(getCountryFacilityCount);

router.route("/demographics").get(getDemographics);

router.route("/trials-per-city").get(getTopCities);

router.route("/getClinicalTrialsData").get(getClinicalTrialStats);

export default router;