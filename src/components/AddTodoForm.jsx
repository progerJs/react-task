import React, { useRef } from "react";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const AddTodoForm = (props) => {
    const inputRef = useRef();
    const errorRef = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        if (inputRef.current.value === "") {
            errorRef.current.classList.add("active");
            return null;
        }
        errorRef.current.classList.remove("active");

        props.addToList(e, inputRef.current.value);
        e.currentTarget.reset();
    };
    
    return (
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
            <Input
            placeholder="Todo"
            inputProps={{
                "aria-label": "Description"
            }}
            // onChange={handleChange}
            inputRef={inputRef}
            style={{ width: "90%" }}
            />

            <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: "10%" }}
            >
            Add
            </Button>

            <p ref={errorRef} className="error">
            {/* Error, must enter a value! */}
            </p>
        </form>
    );
}

export default AddTodoForm;
