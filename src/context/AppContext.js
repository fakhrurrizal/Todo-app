import { createContext, useEffect } from 'react';
import React, { useContext, useState } from 'react';
import { API } from '../config/api';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

export const AppContext = createContext();

export const AppContextProvider = ({children}) => { 

    // Global State
    const navigate = useNavigate()
    const { id } = useParams()
    const [isChecked, setIsChecked] = useState(false);
    const [idDelete, setIdDelete] = useState(null)


    // -----------------List Activity------------- //

    let { data: activity, refetch: listRefetch } = useQuery("activitiesCaches", async () => {
        const response = await API.get("/activity-groups");
    
        return response.data.data;
    });


    // -----------------List Items------------- //

    


     // Get Item
     let { data: listItems, refetch: itemRefetch } = useQuery("itemsCaches", async () => {
       const response = await API.get("/todo-items");
       return response.data.data;
      });
      

      // Update is_active
      const handleUpdateIsDone = async( id_items, current_status) => {
        try {
          await API.patch(
            `/todo-items/${id_items}`,
            { is_active: current_status == 1 ? 0 : 1 },
            { validateStatus: () => true }
            );
            itemRefetch();
          } catch (err) {
            console.log(err);
          }
        }
        
        // Delete Item
        const deleteById = useMutation(async (id) => {
            try {
              await API.delete(`/todo-items/${id}`)
              itemRefetch()
        
            } catch (error) {
              console.log(error)
            }
          })
        // const handleDelete = (id, title) => {
          //     setIdDelete(id)
    //     setItemDelete(title)
    //     handleShow()
    // }


    const appContextsValue = {
        activity,
        navigate,
        isChecked,
        deleteById, 
        listItems,
        listRefetch,
        handleUpdateIsDone,
        itemRefetch
        // handleDelete
    }

    return (
        <AppContext.Provider value={appContextsValue}>
             {children}
        </AppContext.Provider>
    )
}