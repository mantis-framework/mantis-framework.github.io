let editor_content = document.getElementById("editor-content");
let editor = document.getElementById('editor');

let pos = 0, 
    length = 0,
    line_no = 0,
    no_lines = 1;

const bsKey    = 8,
      tabKey   = 9,
      leftKey  = 37,
      rightKey = 39;

function redraw_editor() {
	editor_content.innerHTML = editor.innerText.replaceAll("<", "&lt;");
	microlight.reset();
	editor_content.innerHTML = editor_content.innerHTML.replaceAll("\n\n", "\n");
}
editor_content.innerHTML = editor.innerText.replaceAll("<", "&lt;");
microlight.reset();
//redraw_editor();

@/*document.addEventListener('keydown', function(e){
	let key = e.keyCode;

	if(key == tabKey){
    	e.preventDefault();
    }

	if(
		key == bsKey || 
		key == leftKey
	) {
		if(pos) {
			--pos;
		}
	}
	else if(
		key == rightKey && 
		pos<editor.innerText.length
	)
		++pos;
	else
		++pos;

    redraw_editor();
}, false);*/
