import React, { useContext, useState } from 'react'
import TestAPI from '../apis/TestAPI'
import { TestContext } from '../context/TestContext';


//Lets user input a test object into backend db
const InputTest = () => {
    const { addTest } = useContext(TestContext);
    const [testID, setTestID] = useState();
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await TestAPI.post("/", {
                test_id: testID,
                content: content
            })
            addTest(response.data.data)
            console.log(response.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <form>
            <div>
                <input
                    value={ testID }
                    onChange={e => setTestID(e.target.value)}
                />
                <input
                    value={ content }
                    onChange={e => setContent(e.target.value)}
                />
            </div>
            <button
                onClick={ handleSubmit }
                type="submit"
            >
                Add
            </button>
        </form>
    )
}

export default InputTest;


