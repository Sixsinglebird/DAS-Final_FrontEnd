import {useEffect, useState} from "react";

const Input = () => {
    const [value, setValue] = useState();
    const [valueList, setValueList] = useState([]);
    const [tree, setTree] = useState([]);
    const [treeData, setTreeData] = useState(<></>);

    const addValue = (value) => {
        setValueList([...valueList, value]);
    }

    const postBT = async () => {
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

    const postSortedTree = async () => {
        await fetch("http://localhost:8080/orderTree", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tree)
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
        setTreeData(traverseTree(tree));
    }, [tree]);



    return (
        <div className={"input"}>
            <form className={"row"} onSubmit={(event) => {
                event.preventDefault();
                addValue(value);
            }}>
                <input type={"number"} onChange={(event) => setValue(event.target.value)}/>
                <button type={"submit"}>Enter Number</button>
            </form>

            <div className={"row"}>
                {valueList.map((value, index) => <p key={index}>{value}</p>)}
            </div>

            <form className={"row"}>
                <button onClick={(event) => {
                    event.preventDefault();
                    postBT();
                    getTree();
                }}>Binary Tree</button>

                <button onClick={(event) => {
                    event.preventDefault();
                    postSortedTree();
                    getTree();
                }}>Sorted tree</button>
            </form>

            <div className={"row"}>
                {treeData}
            </div>
        </div>
    );
}

export default Input;