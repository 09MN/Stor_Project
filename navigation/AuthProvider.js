import React, { createContext, useState } from "react";
//autentikasi
import auth from "@react-native-firebase/auth";
//database
import firestore from "@react-native-firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    //Firebase Authentication
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            alert(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                //kalo user udah buat akun, bakal di store ke database
                //detailnya sedemekian rupa
                firestore()
                  .collection("users")
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: "",
                    lname: "",
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  //buat nangkep error
                  .catch((error) => {
                    console.log(
                      "Something went wrong with added user to firestore: ",
                      error
                    );
                  });
              })
              //kalo ada salah di signup
              .catch((error) => {
                alert("Something went wrong with sign up: ", error);
              });
          } catch (e) {
            console.log(e);
          }
          {
            /* fungsi logout */
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
