import React, { useState, useContext } from "react";
import { Context } from './booklist';

const Bookform = (props) => {
    const { editData, setEditData } = useContext(Context);
    const empty = {
        name: "",
        price: "",
        category: ""
    };
    const toEdit = editData && editData.name && editData.name.length > 0;
    const [newData, setNewData] = useState(toEdit ? editData : empty);
    if (toEdit && newData != editData) {
        setNewData(editData);
    }

    const Change = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
        toEdit && setEditData({ ...newData, [name]: value });
    };
    return (
        <>
            <div className={props.formVisible ? "show popup" : "popup"}>
                <form onSubmit={e => e.preventDefault()}>
                    <h2>{toEdit? "Modify Book": "Add New"}</h2>
                    <button className="btn-close" onClick={() => props.closeForm()}>&times;</button>
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Enter book name..."
                            onChange={Change}
                            value={newData.name}
                            className="form-control-sm fs-4 col-3 mx-5"
                        />
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            required
                            placeholder="Enter book price..."
                            onChange={Change}
                            value={newData.price}
                            className="form-control-sm col-3 mx-5 fs-4"
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <input
                            type="text"
                            name="category"
                            required
                            placeholder="Enter book category..."
                            onChange={Change}
                            value={newData.category}
                            className="form-control-sm col-3 mx-5 fs-4"
                        />
                    </div>
                    <button
                        className="btn-primary"
                        onClick={e => { e.stopPropagation(); props.onUpdate(newData, toEdit); }}
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
export default Bookform;
