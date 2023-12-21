import {useEffect, useState} from "react";

const Input = () => {
    const [value, setValue] = useState();
    const [valueList, setValueList] = useState([]);
    const [tree, setTree] = useState([]);
    const [treeString, setTreeString] = useState("");

    const addValue = (value) => {
        setValueList([...valueList, value]);
    }

    const postList = async () => {
        let tmp = [];
        valueList.forEach((value) => {
            tmp.push(value)
        })

        await fetch("http://localhost:8080/process-numbers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tmp)
        }).then((response) => {
            console.log(response)
            return response;
        })
    }

    const getTree = async () => {
        await fetch("http://localhost:8080/tree", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json()
        }).then((data) => setTree(data))}

    function traverseTree(node, level = 0) {
        if (!node) return [];
        const rowStyle = { marginTop: `${level * 20}px` }; // adjust the multiplier as needed

        return [
            ...traverseTree(node.left, level + 1),
            <div style={rowStyle} key={node.value}>{node.value}</div>,
            ...traverseTree(node.right, level + 1)
        ];
    }

    useEffect(() => {
        setTreeString(traverseTree(tree));
    }, [tree]);

    return (
        <div className={"input"}>
            <div className={"row"}>
                <input type={"number"} onChange={(event) => setValue(event.target.value)}/>
                <button onClick={() => addValue(value) }>Enter Number</button>
            </div>
            <div className={"row"}>
                {valueList.map((value, index) => <p key={index}>{value}</p>)}
            </div>
            <div className={"row"}>
                <button onClick={() => postList()}>Submit List</button>
                <button onClick={() => getTree()}>View Tree</button>
            </div>
            <div className={"row"}>
                {treeString}
            </div>
        </div>
    );
}

export default Input;