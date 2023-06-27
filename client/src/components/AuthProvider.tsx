// import { useState, createContext, useContext, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   onAuthStateChanged,
//   signInWithPopup,
//   User as FirebaseUser,
//   GoogleAuthProvider,
// } from "firebase/auth";

// export interface AuthType {
//   currentUser: FirebaseUser | null;
//   onLogout: () => void;
//   onLogin: () => void;
// }

// const AuthContext = createContext<AuthType | null>(null);

// const AuthProvider = ({ children }: any) => {
//   const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const login = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     const origin = location.state?.from?.pathname || "/dashboard";
//     navigate(origin);
//   };
//   const logout = () => {
//     return auth.signOut();
//   };

//   const value: AuthType = {
//     currentUser,
//     onLogout: logout,
//     onLogin: login,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
// export default AuthProvider;
