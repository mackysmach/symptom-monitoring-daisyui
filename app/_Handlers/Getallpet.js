export const getallpet = async (user_id) => {
    try {
        const res = await fetch(`http://localhost:8080/pet/all/${user_id}`)
        let data = await res.json()
        switch (res.status) {
            case 404:
                data = []
                break
            case 500:
                throw new Error(data.error)
        }
        return data
    } catch (error) {
        throw error
    }
}


// async function getallpet(userID) {
//     try {
//         const res = await fetch(`http://localhost:8080/pet/all/${userID}`)
//         let data = await res.json()
//         switch (res.status) {
//             case 404:
//                 data = []
//                 break
//             case 500:
//                 throw new Error(data.error)
//         }
//         return data
//     } catch (error) {
//         throw error
//     }
// }
// export default getallpet;