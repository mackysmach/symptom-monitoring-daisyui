export const search = async (page,keyword) => {
    try {
        if (page === undefined) page = 1;
        if(keyword===undefined) keyword='';
        const config = {
            method: "GET"
        };
        const res = await fetch(` http://localhost:8080/document/search?page=${page}&page_size=10&keyword=${keyword}`, config);
        const data = await res.json();
        //console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}