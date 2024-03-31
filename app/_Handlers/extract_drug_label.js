export const extract_drug_label = async (imageFile,user_id) => {
    const fileFormData = new FormData();
                    fileFormData.append('file', imageFile);
                    fileFormData.append('user_id',user_id)

                    const fileResponse = await fetch(`http://localhost:8080/drug_label_extraction/`, {
                        method: 'POST',
                        body: fileFormData,
                    });
                    const result = await fileResponse.json()
                    // console.log(result);
                    return(result);

}