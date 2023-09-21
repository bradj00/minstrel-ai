
export const handleSubmitMessage = (data, dataSetterObj) => {
    console.log('submitting message: ',data)
    
    dataSetterObj.setMessage(data);
};

// export const handleFriendlyNameLookupResponse = (data, dataSetterObj) => {
//     console.log('FriendlyNameLookupResponse: ',data)
    
//     dataSetterObj.setFriendlyLookupResponse(data);
// };

