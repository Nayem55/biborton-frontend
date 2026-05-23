// import { useEffect, useState } from "react"

// const useAdmin = ph =>{
//     console.log(ph)
//     const [isAdmin ,setIsAdmin] = useState(false);
//     const [isAdminLoading,setIsAdminLoading] = useState(false);
//     useEffect(() => {
//           setIsAdminLoading(true);
//           fetch(`http://localhost:3200/users/admin/${ph}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setIsAdmin(data.isAdmin);
//                 setIsAdminLoading(false);
//             });
//       }, [ph]);
//       return [isAdmin, isAdminLoading];
// }

// export default useAdmin;
