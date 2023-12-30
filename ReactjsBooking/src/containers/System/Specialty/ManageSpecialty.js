import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";




const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: ''
    };
  }
  componentDidMount() {
   
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {  
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleOnchangeText = (event,id) => {
    let stateCopy = {...this.state}
    stateCopy[id] = event.target.value
    this.setState({
      ...stateCopy
    });
  };
  // Base64
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64
      });
    }
  };
  handleSaveNewSpecialty = async () =>{
    let res =  await createNewSpecialty({
      name: this.state.name,
      imageBase64: this.state.imageBase64,
      descriptionMarkdown:this.state.descriptionMarkdown,
      descriptionHTML:this.state.descriptionHTML
    })
    if(res && res.errCode === 0){
      toast.success("Save information Schedule ");
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: ''
      }
        )
    }else{
      toast.error("Check error information Schedule ");
      console.log("Check error information Schedule", res );
    }
  }

  render() { 
    return (
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tên Chuyên Khoa</label>
              <input className="form-control" type="text"
               value={this.state.name}
               onChange={(event) => this.handleOnchangeText(event, 'name')}
              />
            </div>
            <div class="col-3 form-group">
            <label>Ảnh chuyên khoa</label>
            <input type="file" class="form-control form-control-file"
            onChange={(event) =>this.handleOnchangeImage(event)}
            />
          </div>
            <div className="col-12 mt-3">
              <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button className="btn-save-specialty"
              onClick={() =>this.handleSaveNewSpecialty()}
              >Save</button>
            </div>
          </div>   
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
