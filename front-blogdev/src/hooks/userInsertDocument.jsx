import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const initialState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERT_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: true }
        default:
            return state
    }
}

export const userInsertDocument = (docCollection) => {
    const [response, dispatch] = useReducer(insertReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const checkCancelledBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {
        checkCancelledBeforeDispatch({ type: "LOADING" })

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }
            const insertDocument = await addDoc(collection(db, docCollection), newDocument)
            checkCancelledBeforeDispatch({ 
                type: "INSERT_DOC", 
                payload: insertDocument 
            })
        } catch (error) {
            checkCancelledBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return {
        insertDocument,
        response
    }
}