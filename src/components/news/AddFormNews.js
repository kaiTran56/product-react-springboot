import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "./news.css";
import axios from "axios";

class AddFormNews extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.tags = [];
        this.state.imageUri = '';        
        this.state.editorState = this.initialContentEditor(this.state.content);
    }

    initialContentEditor =(content)=>{
        const contentBlock = htmlToDraft(content);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;
    }

    initialState = {
        id: 0,
        createdDate: '',
        modifiedDate: '',
        createdBy: '',
        modifiedBy: '',
        title: '',
        description: '',
        thumbnail: '',
        content: "<p>Hello World</p>",
        tagList: []
    }

    onKeyDown = event => {
        let value = event.target.value;
        if (event.key === "Enter" && value) {
            let { tags } = this.state;
            tags.push(value);
            this.setState({
                tags: tags,
                tagList: tags

            });
        }
    }

    removeTag = (index) => {
        let { tags } = this.state;
        tags.splice(index, 1);
        this.setState({
            tags: tags
        });
    }
    onSubmit = event => {
        event.preventDefault();
    }

    onChangeImage = (event) => {
        const data = new FormData();
        data.append("file", event.target.files[0]);
        axios.post("http://localhost:8080/api/news/thumbnail", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => response.data)
            .then(res => {
                this.setState({
                    imageUri: res.fileDownloadUri,
                    thumbnail: res.fileDownloadUri
                })
            });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
            content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    }

    saveNews = () => {
        let { id,
            createdDate,
            modifiedDate,
            createdBy,
            modifiedBy,
            title,
            description,
            thumbnail,
            content,
            tagList } = this.state;
        const newsObj = {
            id: id,
            createdDate: createdDate,
            modifiedDate: modifiedDate,
            createdBy: createdBy,
            modifiedBy: modifiedBy,
            title: title,
            description: "<i>" + description + "</i>",
            thumbnail: thumbnail,
            content: content,
            tagList: tagList,
            topic: 'tranquyet'
        }

        axios.post("http://localhost:8080/api/news/save", newsObj)
            .then(response => response.data)
            .then(res => {
            })
            .catch(err => {
            })

        this.setState(this.initialState);
        this.setState({ tags: [] });
        this.onContentStateChange();
    }

    onContentStateChange = () => {
        this.setState({
            content: ""
        })
    }

    onChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    }


    render() {

        let { editorState, id,
            createdDate,
            modifiedDate,
            createdBy,
            modifiedBy,
            title,
            description,
            thumbnail,
            content,
            tagList } = this.state;
        let { tags } = this.state;
        let emlementTag = tags.map((tag, index) => {
            return (<span class="badge badge-primary" key={index} onClick={this.removeTag.bind(this, index)}>{tag}</span>)
        });

        return (
            <div>
                <div class="card ">
                    <div class="card-header card-title text-center">Add News</div>
                    <div class="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div class="row">
                                <div class="col-3 text-center">
                                    <img src={this.state.imageUri} className="set-size-img-large img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="" />
                                </div>
                                <div class="col-9">
                                    <div class="cols-12">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="">Title</span>
                                            </div>
                                            <input type="text" name="title" onChange={this.onChange} class="form-control" value={title} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="cols-12">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="">Created Date</span>
                                            </div>
                                            <input type="text" name="createdDate" class="form-control" value={createdDate} />
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="">Modified Date</span>
                                            </div>
                                            <input type="text" name="modifiedDate" class="form-control" value={modifiedDate} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="cols-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text">Upload</span>
                                            </div>
                                            <div class="custom-file">
                                                <input type="file" name="" onChange={this.onChangeImage} class="custom-file-input" id="inputGroupFile01" />
                                                <label class="custom-file-label" for="inputGroupFile01">Choose image</label>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="cols-12">
                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1">Description</label>
                                            <textarea class="form-control" name="description" onChange={this.onChange} rows="2" style={{ resize: "none" }} value={description}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />

                            <div className="row">
                                <div class="cols-12 ck-editor__editable">
                                    <label for="exampleFormControlTextarea1">Content</label>
                                    <Editor
                                        editorState={editorState}
                                        wrapperClassName="demo-wrapper"
                                        editorClassName="demo-editor"
                                       onEditorStateChange={this.onEditorStateChange}
                                    />
                                </div>
                            </div>
                            <hr />
                            <div class="row">

                                <div className="col-4">
                                    <div class="input-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="">Tags</span>
                                        </div>
                                        <input type="text" name="tags" onKeyDown={this.onKeyDown} class="form-control" />

                                    </div>
                                </div>
                                <div class="col-8"><h4>{emlementTag}</h4></div>


                            </div>
                            <hr />
                            <div>
                                <button type="button" class="btn btn-success" onClick={this.saveNews}>Save</button>
                                {' '}
                                <button type="button" class="btn btn-info">Clear</button>
                            </div>
                        </form>
                    </div>

                    <div class="card-footer text-right">Tran Quyet</div>
                </div>
            </div>

        );
    }
}

export default AddFormNews;