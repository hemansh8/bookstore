import { data } from '../lib/data';
import Book from './book';
import Bookform from './bookform';
import React, { useState } from 'react';

export const Context = React.createContext({ value: null, setValue: () => { } });

export default function BookList() {
    const [show, setShow] = useState(false);
    const [tableData, setTableData] = useState(data);
    const [editData, setEditData] = useState({
        id: "",
        name: "",
        price: "",
        category: ""
    });
    const Delete = (del) => {
        const delData = tableData.filter((tbd) => {
            return del !== tbd.id;
        });
        setTableData(delData);
    };
    const Add = (book) => {
        setTableData([...tableData,
        {
            id: tableData[tableData.length - 1].id + 1,
            name: book.name,
            price: book.price,
            category: book.category
        }
        ]);
    };
    const Edit = (book) => {
        const edited = tableData.map((data) => {
            if (data.id === book.id) {
                return book;
            } else {
                return data;
            }
        });
        setTableData(edited);
    };
    return (
        <div>
            <h1>My BookList</h1>
            <Context.Provider value={{ editData, setEditData }}>
                <table className="table table-striped table-primary table-hover text-center fs-5 table-bordered border-dark">
                    <thead>
                        <tr>
                            <th id="tr">Name</th>
                            <th id="tr">Price</th>
                            <th id="tr">Category</th>
                            <th id="tr">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((info) => {
                            return <Book showForm={setShow} {...info} key={info && info.id?info.id:100} remove={(id) => Delete(id)} />
                        })}

                    </tbody>
                </table>
                <Bookform formVisible={show} closeForm={() => setShow(false)} onUpdate={(book, edit) => {setShow(!show); edit? Edit(book) : Add(book);}} />
                <button className='btn-add' onClick={() => setShow(true)}>&#43;</button>
            </Context.Provider>
        </div>
    );
}
