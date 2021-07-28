import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//import axios from 'axios';
import "../../App.css";
//import UploadAdapter from './UploadAdapter';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';


// const URL = 'http://localhost:8080/api/image/upload/';

// function CustomUploadAdapterPlugin(editor) {
//     editor.plugins.get("FileRepository").createUploadAdapter = loader => {
//         const test = new UploadAdapter(loader, URL);
//         console.log(test);
//         return test;
//     };
// }

class CKNote extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     data: ""
        // }

        this.state = {
            editorState: EditorState.createEmpty(),
            content: ''
        };

    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedFile: null,
    //         imageTemp: '',
    //     }

    // }


    // onChangeHandler = event => {
    //     console.log(event.target.files[0]);
    //     this.setState({
    //         selectedFile: event.target.files[0],
    //         loaded: 0,
    //     })
    // }

    // onClickHandler = () => {
    //     const data = new FormData()
    //     data.append('file', this.state.selectedFile)
    //     axios.post("http://localhost:8080/uploadFile", data, {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })
    //         .then(res => {
    //             let data = res.data;
    //             console.log(data);
    //             this.setState({
    //                 imageTemp: data.fileDownloadUri,
    //             })
    //         });
    // }
    onClick=()=>{
        console.log(this.state.content);
    }
   
    render() {

        const { editorState } = this.state;
      
        return (
            <div>
                <div class="card">

                    <div class="card-body">
                        <h1>
                            GeeksforGeeks
                        </h1>
                        <h3>
                            File Upload using React!
                        </h3>
                        <img src={this.state.imageTemp} class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="" />

                        <div>
                            <input type="file" name="file" onChange={this.onChangeHandler} />
                            <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                        </div>

                        <hr />
                        <h2>Using CKEditor 5 build in React</h2>
                        {/* <div className="ck-editor__editable">
                            <CKEditor
                                config={config}
                                name="test"
                                editor={ClassicEditor}
                                data={this.state.data}

                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    console.log(data);
                                    this.setState({ data });
                                }}

                            />
                        </div> */}
                        <h1>REACT DRAF</h1>
                        <div className="ck-editor__editable">
                            <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />
                           
                        </div>
                        <button type="button" class="btn btn-danger" onClick={this.onClick}>button</button>
                    </div>



                </div>

            </div>
            
            
            
        );
    }
}

export default CKNote;