const Addpetimg = async (formData,petid) => {
    const url =`http://localhost:8080/image/${petid}`;

    const config = {
        method: "POST",
        body: formData,
    };

    try {
        const response = await fetch(url, config);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

export default Addpetimg;
