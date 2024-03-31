export const getallremindder = async (pet_id) => {
    try {

        const config = {
            method: "GET"
        };
        const res = await fetch(`http://localhost:8080/reminder/all/${pet_id}`, config);
        const data = await res.json();
        //console.log(data)
        return data;
    } catch (err) {
        console.log(err);
    }
}