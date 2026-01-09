let mainData;
let stepState;
const activeClasses = {
    card: 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-default',
    circle: 'bg-white/20 text-white border border-white/30'
};
const completedClasses = {
    card: 'bg-[#1fad721a] text-[#008046] cursor-pointer',
    circle: 'bg-[#008046] text-white'
};
const inactiveClasses = {
    card: 'bg-white text-gray-600 cursor-not-allowed',
    circle: 'bg-gray-300 text-gray-700'
};
// let isInitialLoad = true;

// $('#step-1').on('click', function () {
//     stepState = 'step-1';
//     setStepState('step-1', 'active');
//     setStepState('step-2', 'inactive');
//     setStepState('step-3', 'inactive');
// });

// $('#step-2').on('click', function () {
//     stepState = 'step-2';
//     setStepState('step-1', 'completed');
//     setStepState('step-2', 'active');
//     setStepState('step-3', 'inactive');
// });

$(document).ready(function () {
    globalThis.getMainData().then(function (data) {
        console.log('mainData ready:', data);
        mainData = data;
        // use data safely here
        getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    });

    // onSelectStep('step-1');
    setStepState('step-1', 'active');
    setStepState('step-2', 'inactive');
    setStepState('step-3', 'inactive');

    $('#painPointsBtn').on('click', function () {
        $('#painPointsBlock').slideToggle();
        const $el = $('#painPointsBlock');
        $('html, body').animate(
            {
                scrollTop: $el.offset().top
            },
            600
        );
    });

    $('#sourcedViaHyreoTalentNetwork').text($('#sourcedViaHyreoTalentNetworkInput').val());
    $('#sourcedViaHyreoTalentNetworkInput').on('input', function () {
        $('#sourcedViaHyreoTalentNetwork').text($(this).val());
    });

    $('#applicantsResumeMatching').text($('#applicantsResumeMatchingInput').val());
    $('#applicantsResumeMatchingInput').on('input', function () {
        $('#applicantsResumeMatching').text($(this).val());
    });

    $('#applicantsPreScreened').text($('#applicantsPreScreenedInput').val());
    $('#applicantsPreScreenedInput').on('input', function () {
        $('#applicantsPreScreened').text($(this).val());
    });

    $('#preScreenedCandidatesInterviewed').text($('#preScreenedCandidatesInterviewedInput').val());
    $('#preScreenedCandidatesInterviewedInput').on('input', function () {
        $('#preScreenedCandidatesInterviewed').text($(this).val());
    });

    $('#interviewRounds').text($('#interviewRoundsInput').val());
    $('#interviewRoundsInput').on('input', function () {
        $('#interviewRounds').text($(this).val());
    });

    $('#interviewedCandidatesOffered').text($('#interviewedCandidatesOfferedInput').val());
    $('#interviewedCandidatesOfferedInput').on('input', function () {
        $('#interviewedCandidatesOffered').text($(this).val());
    });

    $('#offerConfirmation').text($('#offerConfirmationInput').val());
    $('#offerConfirmationInput').on('input', function () {
        $('#offerConfirmation').text($(this).val());
        mainData.offerConversion = $(this).val();
        Calculations();
    });
});

function roundDecimal(value, decimals = 2) {
    let factor = Math.pow(10, decimals);
    return Math.round((value + Number.EPSILON) * factor) / factor;
}

function humanRound(value) {
    value = Number(value);

    if (Number.isNaN(value)) return 0;

    const integerPart = Math.trunc(value);
    const decimalPart = value - integerPart;

    const firstDecimalDigit = Math.floor(decimalPart * 10);

    if (firstDecimalDigit >= 5) {
        return integerPart + 1;
    }

    return integerPart;
}

function getProjectedTalentPipelineValues(value) {
    mainData.openPositionsPerYear = value;
    mainData.numberOfInterviews = Number($('#interviewRoundsInput').val());

    const hiredValue = humanRound(mainData.openPositionsPerYear);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #hired', hiredValue, { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #hired').text(hiredValue);
    // }

    mainData.offeredCandidates = roundDecimal(mainData.openPositionsPerYear / ($('#offerConfirmationInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #offeredCandidates', humanRound(mainData.offeredCandidates), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #offeredCandidates').text(humanRound(mainData.offeredCandidates));
    // }

    mainData.shortlistedForInterviews = roundDecimal(mainData.offeredCandidates / ($('#interviewedCandidatesOfferedInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #shortlistedForInterviews', humanRound(mainData.shortlistedForInterviews), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #shortlistedForInterviews').text(humanRound(mainData.shortlistedForInterviews));
    // }

    mainData.prescreeningCompleted = roundDecimal(mainData.shortlistedForInterviews / ($('#preScreenedCandidatesInterviewedInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #prescreeningCompleted', humanRound(mainData.prescreeningCompleted), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #prescreeningCompleted').text(humanRound(mainData.prescreeningCompleted));
    // }

    mainData.applicants = roundDecimal(mainData.prescreeningCompleted / ($('#applicantsPreScreenedInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #applicants', humanRound(mainData.applicants), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #applicants').text(humanRound(mainData.applicants));
    // }

    mainData.resumeMatching = roundDecimal(mainData.applicants / ($('#applicantsResumeMatchingInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #resumeMatching').text(humanRound(mainData.resumeMatching));
    // }

    mainData.hyreoSourcedProfiles = roundDecimal(mainData.applicants * ($('#sourcedViaHyreoTalentNetworkInput').val() / 100), 2);
    // if (!isInitialLoad) {
    // animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });
    // } else {
        $('#projectedTalentPipeline #hyreoSourcedProfiles').text(humanRound(mainData.hyreoSourcedProfiles));
    // }

    Calculations();
}

$('#sourcedViaHyreoTalentNetworkInput').on('input', function () {
    mainData.hyreoSourcedProfiles = roundDecimal(Number($('#projectedTalentPipeline #applicants').text().replace(/,/g, '')) * ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#applicantsResumeMatchingInput').on('input', function () {
    mainData.resumeMatching = roundDecimal(Number($('#projectedTalentPipeline #applicants').text().replace(/,/g, '')) / ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#applicantsPreScreenedInput').on('input', function () {
    mainData.applicants = roundDecimal(Number($('#projectedTalentPipeline #prescreeningCompleted').text().replace(/,/g, '')) / ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #applicants', humanRound(mainData.applicants), { duration: 600 });

    mainData.hyreoSourcedProfiles = roundDecimal(mainData.applicants * ($('#sourcedViaHyreoTalentNetworkInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });

    mainData.resumeMatching = roundDecimal(mainData.applicants / ($('#applicantsResumeMatchingInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#preScreenedCandidatesInterviewedInput').on('input', function () {
    mainData.prescreeningCompleted = roundDecimal(Number($('#shortlistedForInterviews').text().replace(/,/g, '')) / ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #prescreeningCompleted', humanRound(mainData.prescreeningCompleted), { duration: 600 });

    mainData.applicants = roundDecimal(mainData.prescreeningCompleted / ($('#applicantsPreScreenedInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #applicants', humanRound(mainData.applicants), { duration: 600 });

    mainData.hyreoSourcedProfiles = roundDecimal(mainData.applicants * ($('#sourcedViaHyreoTalentNetworkInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });

    mainData.resumeMatching = roundDecimal(mainData.applicants / ($('#applicantsResumeMatchingInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#interviewRoundsInput').on('input', function () {
    mainData.numberOfInterviews = Number($(this).val());

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#interviewedCandidatesOfferedInput').on('input', function () {
    mainData.shortlistedForInterviews = roundDecimal(Number($('#offeredCandidates').text().replace(/,/g, '')) / ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #shortlistedForInterviews', humanRound(mainData.shortlistedForInterviews), { duration: 600 });

    mainData.prescreeningCompleted = roundDecimal(mainData.shortlistedForInterviews / ($('#preScreenedCandidatesInterviewedInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #prescreeningCompleted', humanRound(mainData.prescreeningCompleted), { duration: 600 });

    mainData.applicants = roundDecimal(mainData.prescreeningCompleted / ($('#applicantsPreScreenedInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #applicants', humanRound(mainData.applicants), { duration: 600 });

    mainData.hyreoSourcedProfiles = roundDecimal(mainData.applicants * ($('#sourcedViaHyreoTalentNetworkInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });

    mainData.resumeMatching = roundDecimal(mainData.applicants / ($('#applicantsResumeMatchingInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#offerConfirmationInput').on('input', function () {
    mainData.offeredCandidates = (Number($('#hired').text().replace(/,/g, '')) / ($(this).val() / 100));
    animateValue('#projectedTalentPipeline #offeredCandidates', humanRound(roundDecimal(mainData.offeredCandidates)), { duration: 600 });

    mainData.shortlistedForInterviews = roundDecimal(mainData.offeredCandidates / ($(this).val() / 100), 2);
    animateValue('#projectedTalentPipeline #shortlistedForInterviews', humanRound(mainData.shortlistedForInterviews), { duration: 600 });

    mainData.prescreeningCompleted = roundDecimal(mainData.shortlistedForInterviews / ($('#preScreenedCandidatesInterviewedInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #prescreeningCompleted', humanRound(mainData.prescreeningCompleted), { duration: 600 });

    mainData.applicants = roundDecimal(mainData.prescreeningCompleted / ($('#applicantsPreScreenedInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #applicants', humanRound(mainData.applicants), { duration: 600 });

    mainData.hyreoSourcedProfiles = roundDecimal(mainData.applicants * ($('#sourcedViaHyreoTalentNetworkInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #hyreoSourcedProfiles', humanRound(mainData.hyreoSourcedProfiles), { duration: 600 });

    mainData.resumeMatching = roundDecimal(mainData.applicants / ($('#applicantsResumeMatchingInput').val() / 100), 2);
    animateValue('#projectedTalentPipeline #resumeMatching', humanRound(mainData.resumeMatching), { duration: 600 });

    getProjectedTalentPipelineValues(Number($('#openPositionsPerYear').val()));
    Calculations();
});

$('#hyreoTalentNetworkCheckBox').on('change', function () {
    const isChecked = $(this).is(':checked');
    mainData.checkboxHyreoTalentNetwork = isChecked;
    Calculations();
});

$('#automatedResumeMatchingWithJdCheckBox').on('change', function () {
    const isChecked = $(this).is(':checked');
    mainData.checkboxAutomatedResumeMatchingWithJd = isChecked;
    Calculations();
});

$('#preScreeningWithAiAgentsCheckBox').on('change', function () {
    const isChecked = $(this).is(':checked');
    mainData.checkboxPreScreeningWithAiAgents = isChecked;
    Calculations();
});

$('#automatedInterviewSchedulerCheckBox').on('change', function () {
    const isChecked = $(this).is(':checked');
    mainData.checkboxAutomatedInterviewScheduler = isChecked;
    Calculations();
});

$('#postOfferCandidatesEngagementCheckBox').on('change', function () {
    const isChecked = $(this).is(':checked');
    mainData.checkboxPostOfferCandidateEngagement = isChecked;
    Calculations();
});

function Calculations() {
    // ROI Automation
    mainData.numberOfRecruiters = (mainData.openPositionsPerYear / 25);
    mainData.recruiterOrPanelistCostPerMinute = mainData.averageMonthlyRecruiterCost / ((mainData.annualPersonDays * 8 * 60) / 12);

    // mainData.totalNumberOfOffersMade = mainData.offeredCandidates;
    mainData.priceCreditsOffered = (mainData.pricePerModuleOrCvOffered * mainData.offeredCandidates);

    // mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds = (mainData.shortlistedForInterviews*mainData.numberOfInterviews);
    mainData.priceCreditsInterviewed = (mainData.pricePerModuleOrCvInterviewed * (mainData.shortlistedForInterviews * mainData.numberOfInterviews));

    // mainData.averageNoOfApplicantsShortlistedPerJobForPrescreening = mainData.prescreeningCompleted;
    mainData.priceCreditsPreScreened = (mainData.pricePerModuleOrCvPreScreened * mainData.prescreeningCompleted);

    // mainData.averageNumberOfMatchedApplicants = mainData.applicants;
    mainData.priceCreditsMatched = (mainData.pricePerModuleOrCvMatched * mainData.applicants);

    // mainData.averageNumberOfSourcedProfiles = mainData.hyreoSourcedProfiles;
    mainData.priceCreditsSourced = (mainData.pricePerModuleOrCvSourced * mainData.hyreoSourcedProfiles);

    if (mainData.checkboxHyreoTalentNetwork) {
        mainData.externalTokensHyreoTalentNetworkVariableCost = roundDecimal(mainData.hyreoSourcedProfiles * mainData.costPerCandidateSourcing);
        mainData.externalTokensHyreoTalentNetworkFinalCost = roundDecimal(mainData.externalTokensHyreoTalentNetworkVariableCost * (1 + (mainData.externalTokensHyreoTalentNetworkPercentage / 100)));

        // ROI Automation Sourcing
        mainData.averageNumberOfSourcedProfiles = mainData.hyreoSourcedProfiles;
        mainData.currentSourcingToolCostLikeNaukri = roundDecimal(mainData.averageNumberOfSourcedProfiles * mainData.naukriOrFounditSubscriptionCostPerResume);
        mainData.currentSourcingTeamCost30PercentOfTeam = roundDecimal(mainData.numberOfRecruiters * 0.3 * mainData.averageMonthlyRecruiterCost * 12);
        mainData.manualEffortSavedHoursSourcing = roundDecimal(mainData.numberOfRecruiters * 0.3 * mainData.annualPersonDays * 8);
        mainData.costSavedSourcing = mainData.currentSourcingToolCostLikeNaukri + mainData.currentSourcingTeamCost30PercentOfTeam;
        mainData.spendOnTheFeatureSourcing = mainData.externalTokensHyreoTalentNetworkFinalCost;
        mainData.actualCostSavingsPostHyreoSourcing = roundDecimal(mainData.costSavedSourcing - mainData.spendOnTheFeatureSourcing);
        // ROI Automation Sourcing

        // Impact Summary
        mainData.profilesAutoSourcedImpact = mainData.hyreoSourcedProfiles;
        // Impact Summary
    } else {
        mainData.externalTokensHyreoTalentNetworkVariableCost = 0;
        mainData.externalTokensHyreoTalentNetworkFinalCost = 0;
        mainData.averageNumberOfSourcedProfiles = 0;

        mainData.currentSourcingToolCostLikeNaukri = 0;
        mainData.currentSourcingTeamCost30PercentOfTeam = 0;
        mainData.currentSourcingTeamCost30PercentOfTeam = 0;
        mainData.manualEffortSavedHoursSourcing = 0;
        mainData.costSavedSourcing = 0;
        mainData.spendOnTheFeatureSourcing = 0;
        mainData.actualCostSavingsPostHyreoSourcing = 0;

        mainData.profilesAutoSourcedImpact = 0;
    }

    if (mainData.checkboxAutomatedResumeMatchingWithJd) {
        mainData.externalTokensWithJdVariableCost = roundDecimal(mainData.resumeMatching * mainData.costPerCandidateMatching);
        mainData.externalTokensWithJdFinalCost = roundDecimal(mainData.externalTokensWithJdVariableCost * (1 + (mainData.externalTokensWithJdPercentage / 100)));
        // ROI Automation Matching
        mainData.averageNumberOfMatchedApplicants = mainData.applicants;
        mainData.manualEffortSavedHoursMatching = roundDecimal((mainData.timeSpendToMatchOrRankCvMins * mainData.averageNumberOfMatchedApplicants) / 60);
        mainData.costSavedMatching = roundDecimal(mainData.averageNumberOfMatchedApplicants * mainData.timeSpendToMatchOrRankCvMins * mainData.recruiterOrPanelistCostPerMinute);
        mainData.spendOnTheFeatureMatching = mainData.priceCreditsMatched;
        mainData.actualCostSavingsPostHyreoMatching = (mainData.costSavedMatching - mainData.spendOnTheFeatureMatching);

        mainData.touchPointsMatchingAndOutreachEmailRecruiters = 0;
        mainData.touchPointsMatchingAndOutreachEmailCandidates = mainData.resumeMatching * mainData.emailCandidateMatching;
        mainData.touchPointsMatchingAndOutreachSms = mainData.resumeMatching * mainData.smsMatching;
        mainData.touchPointsMatchingAndOutreachWhatsapp = mainData.resumeMatching * mainData.whatsappMatching;
        mainData.touchPointsMatchingAndOutreachVoiceAgent = mainData.resumeMatching * mainData.voiceAgentMatching;
        mainData.touchPointsMatchingAndOutreachChatAgent = mainData.resumeMatching * mainData.chatAgentMatching;

        mainData.profilesMatchedImpact = mainData.resumeMatching;
    } else {
        mainData.externalTokensWithJdVariableCost = 0;
        mainData.externalTokensWithJdFinalCost = 0;

        mainData.averageNumberOfMatchedApplicants = 0;
        mainData.manualEffortSavedHoursMatching = 0;
        mainData.costSavedMatching = 0;
        mainData.spendOnTheFeatureMatching = 0;
        mainData.actualCostSavingsPostHyreoMatching = 0;

        mainData.touchPointsMatchingAndOutreachEmailRecruiters = 0;
        mainData.touchPointsMatchingAndOutreachEmailCandidates = 0;
        mainData.touchPointsMatchingAndOutreachSms = 0;
        mainData.touchPointsMatchingAndOutreachWhatsapp = 0;
        mainData.touchPointsMatchingAndOutreachVoiceAgent = 0;
        mainData.touchPointsMatchingAndOutreachChatAgent = 0;

        mainData.profilesMatchedImpact = 0;
    }

    if (mainData.checkboxPreScreeningWithAiAgents) {
        mainData.externalTokensPreScreeningWithAiAgentsVariableCost = roundDecimal(mainData.prescreeningCompleted * mainData.costPerCandidateScreening);
        mainData.externalTokensPreScreeningWithAiAgentsFinalCost = roundDecimal(mainData.externalTokensPreScreeningWithAiAgentsVariableCost * (1 + (mainData.externalTokensPreScreeningWithAiAgentsPercentage / 100)));

        mainData.averageNoOfApplicantsShortlistedPerJobForPrescreening = mainData.prescreeningCompleted;
        mainData.manualEffortSavedHoursScreening = roundDecimal((mainData.averageNoOfApplicantsShortlistedPerJobForPrescreening * mainData.timeSpendPerScreenManuallyPhoneMins) / 60);
        mainData.costSavedScreening = roundDecimal(mainData.averageNoOfApplicantsShortlistedPerJobForPrescreening * mainData.timeSpendPerScreenManuallyPhoneMins * mainData.recruiterOrPanelistCostPerMinute);
        mainData.spendOnTheFeatureScreening = mainData.priceCreditsPreScreened;
        mainData.actualCostSavingsPostHyreoScreening = (mainData.costSavedScreening - mainData.spendOnTheFeatureScreening);

        mainData.touchPointsAgentsEmailRecruiters = mainData.prescreeningCompleted * mainData.emailRecruitersPrescreen;
        mainData.touchPointsAgentsEmailCandidates = mainData.prescreeningCompleted * mainData.emailCandidatePrescreen;
        mainData.touchPointsAgentsSms = mainData.prescreeningCompleted * mainData.smsPrescreen;
        mainData.touchPointsAgentsWhatsapp = mainData.prescreeningCompleted * mainData.whatsappPrescreen;
        mainData.touchPointsAgentsVoiceAgent = mainData.prescreeningCompleted * mainData.voiceAgentPrescreen;
        mainData.touchPointsAgentsChatAgent = mainData.prescreeningCompleted * mainData.chatAgentPrescreen;

        mainData.prescreeningCompletedImpact = mainData.prescreeningCompleted;
    } else {
        mainData.externalTokensPreScreeningWithAiAgentsVariableCost = 0;
        mainData.externalTokensPreScreeningWithAiAgentsFinalCost = 0;

        mainData.averageNoOfApplicantsShortlistedPerJobForPrescreening = 0;
        mainData.manualEffortSavedHoursScreening = 0;
        mainData.costSavedScreening = 0;
        mainData.spendOnTheFeatureScreening = 0;
        mainData.actualCostSavingsPostHyreoScreening = 0;

        mainData.touchPointsAgentsEmailRecruiters = 0;
        mainData.touchPointsAgentsEmailCandidates = 0;
        mainData.touchPointsAgentsSms = 0;
        mainData.touchPointsAgentsWhatsapp = 0;
        mainData.touchPointsAgentsVoiceAgent = 0;
        mainData.touchPointsAgentsChatAgent = 0;

        mainData.prescreeningCompletedImpact = 0;
    }

    if (mainData.checkboxAutomatedInterviewScheduler) {
        mainData.externalTokensSchedulerVariableCost = roundDecimal(mainData.shortlistedForInterviews * mainData.costPerCandidateInterview);
        mainData.externalTokensSchedulerFinalCost = roundDecimal(mainData.externalTokensSchedulerVariableCost * (1 + (mainData.externalTokensSchedulerPercentage / 100)));

        mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds = mainData.shortlistedForInterviews * mainData.numberOfInterviews;
        mainData.manualEffortSavedHoursInterviewScheduling = roundDecimal((mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds * mainData.timeSpendPerSchedulingTaskInMinsIncludingRescheduling) / 60);
        mainData.costSavedInterviewScheduling = roundDecimal(mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds * mainData.timeSpendPerSchedulingTaskInMinsIncludingRescheduling * mainData.recruiterOrPanelistCostPerMinute);
        mainData.spendOnTheFeatureInterviewScheduling = mainData.priceCreditsInterviewed;
        mainData.actualCostSavingsPostHyreoInterviewScheduling = (mainData.costSavedInterviewScheduling - mainData.spendOnTheFeatureInterviewScheduling);

        mainData.touchPointsSchedulerEmailRecruiters = mainData.shortlistedForInterviews * mainData.emailRecruitersInterview * mainData.numberOfInterviews;
        mainData.touchPointsSchedulerEmailCandidates = mainData.shortlistedForInterviews * mainData.emailCandidateInterview * mainData.numberOfInterviews;
        mainData.touchPointsSchedulerSms = mainData.shortlistedForInterviews * mainData.smsInterview;
        mainData.touchPointsSchedulerWhatsapp = mainData.shortlistedForInterviews * mainData.whatsappInterview * mainData.numberOfInterviews;
        mainData.touchPointsSchedulerVoiceAgent = mainData.shortlistedForInterviews * mainData.voiceAgentInterview * mainData.numberOfInterviews;
        mainData.touchPointsSchedulerChatAgent = mainData.shortlistedForInterviews * mainData.chatAgentInterview * mainData.numberOfInterviews;

        mainData.interviewsAutoScheduledImpact = mainData.shortlistedForInterviews * mainData.numberOfInterviews;
    } else {
        mainData.externalTokensSchedulerVariableCost = 0;
        mainData.externalTokensSchedulerFinalCost = 0;

        mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds = 0;
        mainData.manualEffortSavedHoursInterviewScheduling = 0;
        mainData.costSavedInterviewScheduling = 0;
        mainData.spendOnTheFeatureInterviewScheduling = 0;
        mainData.actualCostSavingsPostHyreoInterviewScheduling = 0;

        mainData.touchPointsSchedulerEmailRecruiters = 0;
        mainData.touchPointsSchedulerEmailCandidates = 0;
        mainData.touchPointsSchedulerSms = 0;
        mainData.touchPointsSchedulerWhatsapp = 0;
        mainData.touchPointsSchedulerVoiceAgent = 0;
        mainData.touchPointsSchedulerChatAgent = 0;

        mainData.interviewsAutoScheduledImpact = 0;
    }

    if (mainData.checkboxPostOfferCandidateEngagement) {
        mainData.externalTokensEngagementVariableCost = roundDecimal(mainData.offeredCandidates * mainData.costPerCandidatePostOffer);
        mainData.externalTokensEngagementFinalCost = roundDecimal(mainData.externalTokensEngagementVariableCost * (1 + (mainData.externalTokensEngagementPercentage / 100)));
        mainData.totalNumberOfOffersMade = mainData.offeredCandidates;

        mainData.touchPointsEngagementEmailRecruiters = mainData.offeredCandidates * mainData.emailRecruitersPostOffer;
        mainData.touchPointsEngagementEmailCandidates = mainData.offeredCandidates * mainData.emailCandidatePostOffer;
        mainData.touchPointsEngagementSms = mainData.offeredCandidates * mainData.smsPostOffer;
        mainData.touchPointsEngagementWhatsapp = mainData.offeredCandidates * mainData.whatsappPostOffer;
        mainData.touchPointsEngagementVoiceAgent = mainData.offeredCandidates * mainData.voiceAgentPostOffer;
        mainData.touchPointsEngagementChatAgent = mainData.offeredCandidates * mainData.chatAgentPostOffer;

        mainData.yearlyTotalOffers = mainData.offeredCandidates;
    } else {
        mainData.externalTokensEngagementVariableCost = 0;
        mainData.externalTokensEngagementFinalCost = 0;
        mainData.totalNumberOfOffersMade = 0;

        mainData.touchPointsEngagementEmailRecruiters = 0;
        mainData.touchPointsEngagementEmailCandidates = 0;
        mainData.touchPointsEngagementSms = 0;
        mainData.touchPointsEngagementWhatsapp = 0;
        mainData.touchPointsEngagementVoiceAgent = 0;
        mainData.touchPointsEngagementChatAgent = 0;

        mainData.yearlyTotalOffers = 0;
    }

    mainData.externalTokensVariableCostInrTotal = roundDecimal(mainData.externalTokensHyreoTalentNetworkVariableCost + mainData.externalTokensWithJdVariableCost + mainData.externalTokensPreScreeningWithAiAgentsVariableCost + mainData.externalTokensSchedulerVariableCost + mainData.externalTokensEngagementVariableCost);
    mainData.externalTokensFinalCostInrTotal = roundDecimal(mainData.externalTokensHyreoTalentNetworkFinalCost + mainData.externalTokensWithJdFinalCost + mainData.externalTokensPreScreeningWithAiAgentsFinalCost + mainData.externalTokensSchedulerFinalCost + mainData.externalTokensEngagementFinalCost);
    mainData.externalTokensFinalCostUsdTotal = roundDecimal(mainData.externalTokensFinalCostInrTotal / mainData.UsdConversion);
    mainData.hyreoTokensSubscriptionCostInr = roundDecimal((mainData.hyreoTokensSubscriptionCostPercentage / 100) * mainData.externalTokensVariableCostInrTotal);

    // ROI AutomationPost Offer
    mainData.yearlyDeclinePercentage = mainData.offerConversion;
    mainData.numberOfCandidatesWhoJoinedAdditionally = roundDecimal(mainData.yearlyTotalOffers * (mainData.conversionPercentageImprovement / 100));
    mainData.realisedRevenueTotalAdditionalBillableHours = roundDecimal(mainData.numberOfCandidatesWhoJoinedAdditionally * mainData.averageBillingLossInBillableDaysPerDeclineInDays * (mainData.percentageOfDeclinedOffersResultingInBillingLoss / 100) * 8);
    mainData.realisedRevenueTotalOpportunityCostSaved = mainData.realisedRevenueTotalAdditionalBillableHours * mainData.averageIndiaBillingRateInUsdPerHour;
    mainData.effortSavedInHours = (mainData.numberOfCandidatesWhoJoinedAdditionally * mainData.effortSavingsAverageNoOfInterviewsToShortlistOneOffer * mainData.effortSavingsAverageTimeOfAnInterviewInHours);
    mainData.effortSavedHiringManagerTotalInUsd = (mainData.effortSavedInHours * mainData.effortSavingsHiringManagerCostPerHrInUsdPerHour);
    mainData.effortSavingsInHours = (10 * mainData.numberOfCandidatesWhoJoinedAdditionally);
    mainData.effortSavedOfferRolloutTotalSavings = (mainData.numberOfCandidatesWhoJoinedAdditionally * mainData.effortSavingsCostPerOfferInUsd);
    mainData.effortSavedNoOfPostOfferResourcesEffortAutomated = (mainData.yearlyTotalOffers / 2000);
    mainData.effortSavedPofuInHours = (mainData.effortSavedNoOfPostOfferResourcesEffortAutomated * 2000);
    mainData.effortSavedPofuTotalInUsd = (mainData.effortSavedNoOfPostOfferResourcesEffortAutomated * mainData.effortSavingsPofuAverageCostPerResourcePerYearInUsd * (mainData.effortSavingsPofuDurationInMonths / 12));

    mainData.totalImpactInUsd = (mainData.realisedRevenueTotalOpportunityCostSaved + mainData.effortSavingsInHours + mainData.effortSavedHiringManagerTotalInUsd + mainData.effortSavedOfferRolloutTotalSavings + mainData.effortSavedPofuTotalInUsd);
    mainData.overallImpactInUsd = mainData.totalImpactInUsd;

    // alert(mainData.totalImpactInUsd);
    // ROI AutomationPost Offer

    // ROI Automation PreOffer
    mainData.priceTotalCredits = (mainData.priceCreditsOffered + mainData.priceCreditsInterviewed + mainData.priceCreditsPreScreened + mainData.priceCreditsMatched + mainData.priceCreditsSourced);
    mainData.totalEffortSaved = (mainData.manualEffortSavedHoursSourcing + mainData.manualEffortSavedHoursMatching + mainData.manualEffortSavedHoursScreening + mainData.manualEffortSavedHoursInterviewScheduling);
    mainData.totalSavingsPreOfferInr = mainData.actualCostSavingsPostHyreoSourcing + mainData.actualCostSavingsPostHyreoMatching + mainData.actualCostSavingsPostHyreoScreening + mainData.actualCostSavingsPostHyreoInterviewScheduling;
    mainData.totalSavingsPreOfferUsd = (mainData.totalSavingsPreOfferInr / mainData.UsdConversion);
    // ROI Automation PreOffer

    // TouchPoints
    mainData.touchPointsTotalEmailRecruiters = (mainData.touchPointsHyreoTalentNetworkEmailRecruiters + mainData.touchPointsMatchingAndOutreachEmailRecruiters + mainData.touchPointsAgentsEmailRecruiters + mainData.touchPointsSchedulerEmailRecruiters + mainData.touchPointsEngagementEmailRecruiters);
    mainData.touchPointsTotalEmailCandidates = (mainData.touchPointsHyreoTalentNetworkEmailCandidates + mainData.touchPointsMatchingAndOutreachEmailCandidates + mainData.touchPointsAgentsEmailCandidates + mainData.touchPointsSchedulerEmailCandidates + mainData.touchPointsEngagementEmailCandidates);
    mainData.touchPointsTotalSms = (mainData.touchPointsHyreoTalentNetworkSms + mainData.touchPointsMatchingAndOutreachSms + mainData.touchPointsAgentsSms + mainData.touchPointsSchedulerSms + mainData.touchPointsEngagementSms);
    mainData.touchPointsTotalWhatsapp = (mainData.touchPointsHyreoTalentNetworkWhatsapp + mainData.touchPointsMatchingAndOutreachWhatsapp + mainData.touchPointsAgentsWhatsapp + mainData.touchPointsSchedulerWhatsapp + mainData.touchPointsEngagementWhatsapp);
    mainData.touchPointsTotalVoiceAgent = (mainData.touchPointsHyreoTalentNetworkVoiceAgent + mainData.touchPointsMatchingAndOutreachVoiceAgent + mainData.touchPointsAgentsVoiceAgent + mainData.touchPointsSchedulerVoiceAgent + mainData.touchPointsEngagementVoiceAgent);
    mainData.touchPointsTotalChatAgent = (mainData.touchPointsHyreoTalentNetworkChatAgent + mainData.touchPointsMatchingAndOutreachChatAgent + mainData.touchPointsAgentsChatAgent + mainData.touchPointsSchedulerChatAgent + mainData.touchPointsEngagementChatAgent);
    mainData.totalTouchPoints = (mainData.touchPointsTotalEmailRecruiters + mainData.touchPointsTotalEmailCandidates + mainData.touchPointsTotalSms + mainData.touchPointsTotalWhatsapp + mainData.touchPointsTotalVoiceAgent + mainData.touchPointsTotalChatAgent);
    if (mainData.totalTouchPoints == 0) {
        $('#candidateTouchpointsImpactContainer').addClass('hidden');
    } else {
        $('#candidateTouchpointsImpactContainer').removeClass('hidden');
    }
    // TouchPoints

    // ROI Engagement
    mainData.countAutomatedTouchPoints = roundDecimal(mainData.totalTouchPoints - mainData.touchPointsTotalEmailRecruiters);
    mainData.countCandidateFeedbacks = roundDecimal((mainData.totalNumberOfOffersMade * (mainData.postOfferAveragePercentageOfCandidatesProvidingFeedback / 100) * mainData.postOfferAverageNumberOfFeedbacksQuestions) + ((mainData.interviewAveragePercentageOfCandidatesProvidingFeedback / 100) * mainData.interviewAverageNumberOfFeedbacksQuestions * mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds) + ((mainData.offerToBeMadeAveragePercentageOfCandidatesProvidingFeedback / 100) * mainData.offerToBeMadeAverageNumberOfFeedbackQuestions * mainData.totalNumberOfOffersMade));
    mainData.countChatbotQueryResolutions = roundDecimal(((mainData.postOfferAverageNumberOfCandidatesEngagingWithChatbot / 100) * mainData.postOfferAverageNumberOfQueriesPerCandidate * mainData.postOfferAverageHandlingTimePerQueryInMins * mainData.totalNumberOfOffersMade) + (mainData.interviewAverageNumberOfQueriesPerCandidate * (mainData.interviewAverageNumberOfCandidatesEngagingWithChatbot / 100) * mainData.averageNoOfInterviewsScheduledIncludingMultipleRounds) + (mainData.applyNumberOfQueriesPerCandidate * (mainData.applyAverageNumberOfCandidatesEngagingWithChatbot / 100) * mainData.averageNumberOfMatchedApplicants));
    mainData.countTicketsOrActionsCapturedByChatbot = roundDecimal((mainData.postOfferAverageCandidatesWhoCreatesTickets / 100) * mainData.postOfferAverageNumberOfTicketPerCandidate * mainData.totalNumberOfOffersMade);
    mainData.countRecruiterAlertsIncludesDailyWeeklyActionReport = mainData.touchPointsTotalEmailRecruiters;
    mainData.countVoiceCalls = mainData.touchPointsTotalVoiceAgent;

    mainData.totalEffortsInMinsAutomatedTouchPoints = roundDecimal(mainData.countAutomatedTouchPoints * mainData.annualEffortInMinsAutomatedTouchPoints);
    mainData.totalEffortsInMinsCandidateFeedbacks = roundDecimal(mainData.countCandidateFeedbacks * mainData.annualEffortInMinsCandidateFeedbacks);
    mainData.totalEffortsInMinsChatbotQueryResolutions = roundDecimal(mainData.countChatbotQueryResolutions * mainData.annualEffortInMinsChatbotQueryResolutions);
    mainData.totalEffortsInMinsTicketsOrActionsCapturedByChatbot = roundDecimal(mainData.countTicketsOrActionsCapturedByChatbot * mainData.annualEffortInMinsTicketsOrActionsCapturedByChatbot);
    mainData.totalEffortsInMinsRecruiterAlertsIncludesDailyWeeklyActionReport = roundDecimal(mainData.countRecruiterAlertsIncludesDailyWeeklyActionReport * mainData.annualEffortInMinsRecruiterAlertsIncludesDailyWeeklyActionReport);
    mainData.totalEffortsInMinsVoiceCalls = roundDecimal(mainData.countVoiceCalls * mainData.annualEffortInMinsVoiceCalls);

    mainData.totalEffortsInHoursAutomatedTouchPoints = roundDecimal(mainData.totalEffortsInMinsAutomatedTouchPoints / 60);
    mainData.totalEffortsInHoursCandidateFeedbacks = roundDecimal(mainData.totalEffortsInMinsCandidateFeedbacks / 60);
    mainData.totalEffortsInHoursChatbotQueryResolutions = roundDecimal(mainData.totalEffortsInMinsChatbotQueryResolutions / 60);
    mainData.totalEffortsInHoursTicketsOrActionsCapturedByChatbot = roundDecimal(mainData.totalEffortsInMinsTicketsOrActionsCapturedByChatbot / 60);
    mainData.totalEffortsInHoursRecruiterAlertsIncludesDailyWeeklyActionReport = roundDecimal(mainData.totalEffortsInMinsRecruiterAlertsIncludesDailyWeeklyActionReport / 60);
    mainData.totalEffortsInHoursVoiceCalls = roundDecimal(mainData.totalEffortsInMinsVoiceCalls / 60);

    mainData.totalEffortsInMins = (mainData.totalEffortsInMinsAutomatedTouchPoints + mainData.totalEffortsInMinsCandidateFeedbacks + mainData.totalEffortsInMinsChatbotQueryResolutions + mainData.totalEffortsInMinsTicketsOrActionsCapturedByChatbot + mainData.totalEffortsInMinsRecruiterAlertsIncludesDailyWeeklyActionReport + mainData.totalEffortsInMinsVoiceCalls)
    mainData.totalEffortsInHours = (mainData.totalEffortsInHoursAutomatedTouchPoints + mainData.totalEffortsInHoursCandidateFeedbacks + mainData.totalEffortsInHoursChatbotQueryResolutions + mainData.totalEffortsInHoursTicketsOrActionsCapturedByChatbot + mainData.totalEffortsInHoursRecruiterAlertsIncludesDailyWeeklyActionReport + mainData.totalEffortsInHoursVoiceCalls);
    mainData.automatedCostSavedInr = (mainData.totalEffortsInMins * mainData.recruiterOrPanelistCostPerMinute);
    mainData.automatedCostSavedUsd = (mainData.automatedCostSavedInr / mainData.UsdConversion);
    // ROI Engagement

    const allModulesNotSelectedFlag = (mainData.checkboxHyreoTalentNetwork || mainData.checkboxAutomatedResumeMatchingWithJd || mainData.checkboxPreScreeningWithAiAgents || mainData.checkboxAutomatedInterviewScheduler || mainData.checkboxPostOfferCandidateEngagement);
    console.log('allModulesNotSelectedFlag', allModulesNotSelectedFlag);
    console.log(mainData.hyreoTokensTotalUsd )

    //HyreoTalentNetwork
    mainData.hyreoTokensTotalInr = mainData.hyreoTokensFixedCost + mainData.hyreoTokensSubscriptionCostInr;
    mainData.hyreoTokensTotalUsd = roundDecimal(mainData.hyreoTokensTotalInr / mainData.UsdConversion);
    mainData.hyreoTokens = allModulesNotSelectedFlag ? mainData.hyreoTokensTotalUsd : 0;
    mainData.externalTokens = roundDecimal(mainData.externalTokensFinalCostUsdTotal + (mainData.externalTokensEngagementFinalCost ? mainData.codingAssessmentCost : 0));
    mainData.estimatedCost = mainData.hyreoTokens + mainData.externalTokens;
    mainData.perJobCost = mainData.estimatedCost / mainData.openPositionsPerYear;
    //HyreoTalentNetwork

    mainData.productivity = humanRound(mainData.totalSavingsPreOfferUsd + mainData.effortSavedPofuTotalInUsd + mainData.effortSavedOfferRolloutTotalSavings + mainData.effortSavedHiringManagerTotalInUsd + mainData.automatedCostSavedUsd);
    mainData.revenue = humanRound(mainData.realisedRevenueTotalOpportunityCostSaved);
    mainData.roi = humanRound(mainData.productivity / (mainData.hyreoTokens + mainData.externalTokens));

    mainData.roiOptimistic = mainData.roi;
    mainData.roiRealistic = mainData.roi * (80/100);
    mainData.roiConservative = mainData.roi * (60/100);

    mainData.automatedVoiceCallsImpact = humanRound((mainData.touchPointsTotalVoiceAgent * mainData.postOfferAverageCallDurationInMins) / 60);
    if (mainData.automatedVoiceCallsImpact == 0) {
        $('#automatedVoiceCallsImpactContainer').addClass('hidden');
    } else {
        $('#automatedVoiceCallsImpactContainer').removeClass('hidden');
    }
    mainData.manualEffortSavedImpact = mainData.totalEffortSaved + mainData.effortSavedPofuInHours + mainData.effortSavingsInHours + mainData.effortSavedInHours + mainData.totalEffortsInHours;
    if (mainData.manualEffortSavedImpact == 0) {
        $('#manualEffortSavedImpactContainer').addClass('hidden');
    } else {
        $('#manualEffortSavedImpactContainer').removeClass('hidden');
    }
    mainData.productiveBillableTimeCreatedImpact = mainData.realisedRevenueTotalAdditionalBillableHours;
    if (mainData.productiveBillableTimeCreatedImpact == 0) {
        $('#productiveBillableTimeCreatedImpactContainer').addClass('hidden');
    } else {
        $('#productiveBillableTimeCreatedImpactContainer').removeClass('hidden');
    }

    if (mainData.interviewsAutoScheduledImpact == 0) {
        $('#interviewsAutoScheduledImpactContainer').addClass('hidden');
    } else {
        $('#interviewsAutoScheduledImpactContainer').removeClass('hidden');
    }

    if (mainData.prescreeningCompletedImpact == 0) {
        $('#prescreeningCompletedImpactContainer').addClass('hidden');
    } else {
        $('#prescreeningCompletedImpactContainer').removeClass('hidden');
    }

    if (mainData.profilesMatchedImpact == 0) {
        $('#profilesMatchedImpactContainer').addClass('hidden');
    } else {
        $('#profilesMatchedImpactContainer').removeClass('hidden');
    }

    if (mainData.profilesAutoSourcedImpact == 0) {
        $('#profilesAutoSourcedImpactContainer').addClass('hidden');
    } else {
        $('#profilesAutoSourcedImpactContainer').removeClass('hidden');
    }

    console.log('mainData', mainData);

    // Animate all numeric values with subtle animations (only if not initial load)
    // if (!isInitialLoad) {
    animateValue('#hyreoTokens', humanRound(mainData.hyreoTokens), { prefix: '$', duration: 600 });
    animateValue('#externalTokens', humanRound(mainData.externalTokens), { prefix: '$', duration: 600 });
    animateValue('#estimatedCost', humanRound(mainData.estimatedCost), { prefix: '$', duration: 700 });
    animateValue('#perJobCost', humanRound(mainData.perJobCost), { prefix: '$', duration: 600 });
    animateValue('#productivity', mainData.productivity, { prefix: '$', duration: 700 });
    animateValue('#revenue', mainData.revenue, { prefix: '$', duration: 700 });
    animateValue('#roi', mainData.roi, { hasX: true, duration: 800, easing: 'easeOutExpo' });
    animateValue('#roi-optimistic', mainData.roiOptimistic, { hasX: true, duration: 800, easing: 'easeOutExpo' });
    animateValue('#roi-realistic', mainData.roiRealistic, { hasX: true, duration: 800, easing: 'easeOutExpo' });
    animateValue('#roi-conservative', mainData.roiConservative, { hasX: true, duration: 800, easing: 'easeOutExpo' });

    animateValue('#profilesAutoSourcedImpact', humanRound(mainData.profilesAutoSourcedImpact), { duration: 600 });
    animateValue('#profilesMatchedImpact', humanRound(mainData.profilesMatchedImpact), { duration: 600 });
    animateValue('#prescreeningCompletedImpact', humanRound(mainData.prescreeningCompletedImpact), { duration: 600 });
    animateValue('#interviewsAutoScheduledImpact', humanRound(mainData.interviewsAutoScheduledImpact), { duration: 600 });
    animateValue('#candidateTouchpointsImpact', humanRound(mainData.totalTouchPoints), { duration: 700 });
    animateValue('#automatedVoiceCallsImpact', humanRound(mainData.automatedVoiceCallsImpact), { duration: 600 });
    animateValue('#manualEffortSavedImpact', humanRound(mainData.manualEffortSavedImpact), { duration: 700 });
    animateValue('#productiveBillableTimeCreatedImpact', humanRound(mainData.productiveBillableTimeCreatedImpact), { duration: 600 });
    // } else {
    //     // Set initial values without animation
    //     $('#hyreoTokens').text(`$${humanRound(mainData.hyreoTokens)}`);
    //     $('#externalTokens').text(`$${humanRound(mainData.externalTokens)}`);
    //     $('#estimatedCost').text(`$${humanRound(mainData.estimatedCost)}`);
    //     $('#perJobCost').text(`$${humanRound(mainData.perJobCost)}`);
    //     $('#productivity').text(`$${mainData.productivity}`);
    //     $('#revenue').text(`$${mainData.revenue}`);
    //     $('#roi').text(`${mainData.roi}x`);
    //     $('#profilesAutoSourcedImpact').text(`${humanRound(mainData.profilesAutoSourcedImpact)}`);
    //     $('#profilesMatchedImpact').text(`${humanRound(mainData.profilesMatchedImpact)}`);
    //     $('#prescreeningCompletedImpact').text(`${humanRound(mainData.prescreeningCompletedImpact)}`);
    //     $('#interviewsAutoScheduledImpact').text(`${humanRound(mainData.interviewsAutoScheduledImpact)}`);
    //     $('#candidateTouchpointsImpact').text(`${humanRound(mainData.totalTouchPoints)}`);
    //     $('#automatedVoiceCallsImpact').text(`${humanRound(mainData.automatedVoiceCallsImpact)}`);
    //     $('#manualEffortSavedImpact').text(`${humanRound(mainData.manualEffortSavedImpact)}`);
    //     $('#productiveBillableTimeCreatedImpact').text(`${humanRound(mainData.productiveBillableTimeCreatedImpact)}`);
    //     isInitialLoad = false;
    // }

    const features = {
        checkboxHyreoTalentNetwork: true,
        checkboxAutomatedResumeMatchingWithJd: true,
        checkboxPreScreeningWithAiAgents: true,
        checkboxAutomatedInterviewScheduler: true,
        checkboxPostOfferCandidateEngagement: true
    };          
    const selectedModulesCount = Object.values(mainData).filter(v => v === true).length;
    $('#countSolutionsSelected').text(selectedModulesCount);
}

$('#openPositionsPerYear').on('input', function () {
    const value = Number($(this).val());
    if (mainData.openPositionsPerYear === value) {
        return;
    };
    $('.op-btn')
        .removeClass('bg-gradient-to-r from-cyan-400 to-blue-500 text-white')
        .addClass('bg-gray-100 text-gray-500');

    onSelectOpenPositionsPerYear(value);
});

$('.op-btn').on('click', function () {
    const value = Number($(this).val()); 
    if (mainData.openPositionsPerYear === value) {
        return;
    };
    $('.op-btn')
        .removeClass('bg-gradient-to-r from-cyan-400 to-blue-500 text-white')
        .addClass('bg-gray-100 text-gray-500');

    onSelectOpenPositionsPerYear(value);
});

function onSelectOpenPositionsPerYear(value) {
    $('#openPositionsPerYear').val(value);
    mainData.openPositionsPerYear = value;
    getProjectedTalentPipelineValues(mainData.openPositionsPerYear);

    if ([50,100,250,300,400,500,1000].includes(Number(value))) {
        $(`.op-btn[value="${value}"]`)
            .removeClass('bg-gray-100 text-gray-500')
            .addClass('bg-gradient-to-r from-cyan-400 to-blue-500 text-white');
    } else{
        $('.op-btn')
            .removeClass('bg-gradient-to-r from-cyan-400 to-blue-500 text-white')
            .addClass('bg-gray-100 text-gray-500');
    }
}

const allowedTransitions = {
    'step-1': [],                 // cannot jump to step-3
    'step-2': ['step-1'],       // can go both ways
    'step-3': ['step-2', 'step-1'],       // can go back
};

function onSelectStepTab(stepId) {
    if (!stepState) {
        stepState = 'step-1';
    }

    if (!allowedTransitions[stepState].includes(stepId)) {
        console.warn(`Blocked transition from ${stepState} → ${stepId}`);
        return;
    }

    onSelectStep(stepId)
}

function onSelectStep(stepId) {

    if (stepId == 'step-1') {
        setStepState('step-1', 'active');
        setStepState('step-2', 'inactive');
        setStepState('step-3', 'inactive');

        $('#resultsBlock').addClass('hidden');
        $('#solutionsBlock').addClass('hidden');
        $('#currentStateBlock').removeClass('hidden');
    } else if (stepId == 'step-2') {
        setStepState('step-1', 'completed');
        setStepState('step-2', 'active');
        setStepState('step-3', 'inactive');

        $('#resultsBlock').addClass('hidden');
        $('#currentStateBlock').addClass('hidden');
        $('#solutionsBlock').removeClass('hidden');
    } else if (stepId == 'step-3') {
        const animatedSelectors = [
            '#hyreoTokens', '#externalTokens', '#estimatedCost', '#perJobCost', 
            '#productivity', '#revenue', 
            '#roi', '#roi-optimistic', '#roi-realistic', '#roi-conservative',
            '#profilesAutoSourcedImpact', '#profilesMatchedImpact', 
            '#prescreeningCompletedImpact', '#interviewsAutoScheduledImpact', 
            '#candidateTouchpointsImpact', '#automatedVoiceCallsImpact', 
            '#manualEffortSavedImpact', '#productiveBillableTimeCreatedImpact'
        ];
        
        animatedSelectors.forEach(selector => {
            $(selector).text('0');
        });

        Calculations();
        setStepState('step-1', 'completed');
        setStepState('step-2', 'completed');
        setStepState('step-3', 'active');

        $('#solutionsBlock').addClass('hidden');
        $('#currentStateBlock').addClass('hidden');
        $('#resultsBlock').removeClass('hidden');
    }
    $('html, body').animate(
        {
            scrollTop: 0
        },
        600
    );
    stepState = stepId;
}

function setStepState(stepId, state) {
    const $card = $('#' + stepId);
    const $circle = $card.find('.step-circle');

    // Reset first (this is critical)
    $card
        .removeClass('bg-white bg-purple-50 bg-green-50 border-gray-200 border-purple-500 border-green-500 bg-[#e6daff] bg-[#1fad721a text-[#008046] bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-not-allowed cursor-default cursor-pointer text-gray-600');

    $circle
        .removeClass('bg-gray-300 bg-green-600 text-white text-gray-700 text-white bg-[#008046] bg-[#ffffff33] bg-white/20 text-white border border-white/30');

    if (state === 'inactive') {
        $card.addClass(inactiveClasses.card);
        $circle.addClass(inactiveClasses.circle);
    }

    if (state === 'active') {
        $card.addClass(activeClasses.card);
        $circle.addClass(activeClasses.circle);
    }

    if (state === 'completed') {
        $card.addClass(completedClasses.card);
        $circle.addClass(completedClasses.circle);
    }
}