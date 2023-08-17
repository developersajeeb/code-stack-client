import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import Editor from "react-quill/lib/toolbar";
import '../AddQuestion/AddQuestion.css'


const AddQuestion = () => {
 
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["clean"],
      ];
      Editor.modules = {
        syntax: false,
        toolbar: toolbarOptions,
        clipboard: { matchVisual: false },
      };
    
      Editor.formats = ["header", "font", "size", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "indent", "link", "image", "video"];
    
      return (
        <div className="add-question">
          <div className="add-question-container">
            <div className="head-title">
              <h1>Ask a public question</h1>
            </div>
            <div className="question-container">
              <div className="question-options">
                <div className="question-option">
                  <div className="title">
                    <h3>Title</h3>
                    <small>
                      Be specific and imagine you are asking a question to another
                      person
                    </small>
                    <input
    
                      type="text"
                      placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                    />
                  </div>
                </div>
                <div className="question-option">
                  <div className="title">
                    <h3>Body</h3>
                    <small>
                      Include all the information someone would need to answer your
                      question
                    </small>
                    <ReactQuill
    
                      modules={Editor.modules}
                      className="react-quill"
                      theme="snow"
                    />
                  </div>
                </div>
    
    
                <div className="question-option">
                  <div className="title">
                    <h3>Tags</h3>
                    <small>
                      Add up to five tags to describe what your question is about
                    </small>
                    {/* <TagsInput
                
                  name="fruits"
                  placeHolder="press enter to add new tag"
                /> */}
                <input name="tags" placeholder="Enter added to new tag" />
    
    
                  </div>
                </div>
              </div>
            </div>
            <button className="button"> Add  question </button>

          </div>
        </div>
      )
    };
    


export default AddQuestion;