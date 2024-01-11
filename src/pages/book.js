import { useContext } from "react";
import {Context} from './booklist';

export default function Book(props) {
    const {setEditData} = useContext(Context);
    const Edit = (book) => {
        setEditData(
            {
                id: book.id,
                name: book.name,
                price: book.price,
                category: book.category
            }
        );
        props.showForm(!props.formVisible);
    };
    return (
        <>
            <tr>
                <td>
                    <button className="btn-book" onClick={() => Edit(props)}>{props.name}</button>
                </td>
                <td>{props.price}</td>
                <td>{props.category}</td>
                <td>
                    <button className="btn-del" onClick={() => props.remove(props.id)}>
                        &times;
                    </button>
                </td>
            </tr>
        </>
    );
};