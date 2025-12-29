globalThis.getMainData = function () {
    return $.getJSON('./config/static-params.json').then(function (data) {
        data['totalFixedCost'] = (data.fixedCostAnnual.cloudEuRegion + data.fixedCostAnnual.whatsAppVoiceAgent + data.fixedCostAnnual.internetCallingOneUser);
        data['hyreoTokensFixedCost'] = (data.totalFixedCost * (1 + (data.hyreoTokensFixedCostPercentage/100)));
        data['costPerCandidateSourcing'] = (data.individualCostComponents.sourcing.foundItContactOut + data.individualCostComponents.sourcing.llm + data.individualCostComponents.sourcing.nudge + data.individualCostComponents.sourcing.documentStorage + data.individualCostComponents.sourcing.voiceAgent+ data.individualCostComponents.sourcing.videoStorage);
        data['costPerCandidateMatching'] = (data.individualCostComponents.matching.foundItContactOut + data.individualCostComponents.matching.llm + data.individualCostComponents.matching.nudge + data.individualCostComponents.matching.documentStorage + data.individualCostComponents.matching.voiceAgent+ data.individualCostComponents.matching.videoStorage);
        data['costPerCandidateScreening'] = (data.individualCostComponents.screening.foundItContactOut + data.individualCostComponents.screening.llm + data.individualCostComponents.screening.nudge + data.individualCostComponents.screening.documentStorage + data.individualCostComponents.screening.voiceAgent+ data.individualCostComponents.screening.videoStorage);
        data['costPerCandidateInterview'] = (data.individualCostComponents.interview.foundItContactOut + data.individualCostComponents.interview.llm + data.individualCostComponents.interview.nudge + data.individualCostComponents.interview.documentStorage + data.individualCostComponents.interview.voiceAgent+ data.individualCostComponents.interview.videoStorage);
        data['costPerCandidatePostOffer'] = (data.individualCostComponents.postOffer.foundItContactOut + data.individualCostComponents.postOffer.llm + data.individualCostComponents.postOffer.nudge + data.individualCostComponents.postOffer.documentStorage + data.individualCostComponents.postOffer.voiceAgent+ data.individualCostComponents.postOffer.videoStorage);
        
        return data;
    });
};

// let mainData = {};
// let fixedCost;
// $.getJSON('./config/static-params.json', function (data) {
//     mainData = {...data};
//     mainData['totalFixedCost'] = (mainData.fixedCostAnnual.cloudEuRegion + mainData.fixedCostAnnual.whatsAppVoiceAgent + mainData.fixedCostAnnual.internetCallingOneUser);
//     mainData['hyreoTokensFixedCost'] = (mainData.totalFixedCost * (1 + (mainData.hyreoTokensFixedCostPercentage/100)));
//     mainData['costPerCandidateSourcing'] = (mainData.individualCostComponents.sourcing.foundItContactOut + mainData.individualCostComponents.sourcing.llm + mainData.individualCostComponents.sourcing.nudge + mainData.individualCostComponents.sourcing.documentStorage + mainData.individualCostComponents.sourcing.voiceAgent+ mainData.individualCostComponents.sourcing.videoStorage);
//     mainData['costPerCandidateMatching'] = (mainData.individualCostComponents.matching.foundItContactOut + mainData.individualCostComponents.matching.llm + mainData.individualCostComponents.matching.nudge + mainData.individualCostComponents.matching.documentStorage + mainData.individualCostComponents.matching.voiceAgent+ mainData.individualCostComponents.matching.videoStorage);
//     mainData['costPerCandidateScreening'] = (mainData.individualCostComponents.screening.foundItContactOut + mainData.individualCostComponents.screening.llm + mainData.individualCostComponents.screening.nudge + mainData.individualCostComponents.screening.documentStorage + mainData.individualCostComponents.screening.voiceAgent+ mainData.individualCostComponents.screening.videoStorage);
//     mainData['costPerCandidateInterview'] = (mainData.individualCostComponents.interview.foundItContactOut + mainData.individualCostComponents.interview.llm + mainData.individualCostComponents.interview.nudge + mainData.individualCostComponents.interview.documentStorage + mainData.individualCostComponents.interview.voiceAgent+ mainData.individualCostComponents.interview.videoStorage);
//     mainData['costPerCandidatePostOffer'] = (mainData.individualCostComponents.postOffer.foundItContactOut + mainData.individualCostComponents.postOffer.llm + mainData.individualCostComponents.postOffer.nudge + mainData.individualCostComponents.postOffer.documentStorage + mainData.individualCostComponents.postOffer.voiceAgent+ mainData.individualCostComponents.postOffer.videoStorage);

//     console.log('mainData',mainData);
// });
