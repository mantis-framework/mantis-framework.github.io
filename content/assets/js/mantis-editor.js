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

function new_editor_size() {
	editor.style.marginTop = - editor_content.clientHeight + "px";
}
new ResizeObserver(() => new_editor_size()).observe(editor_content);

function redraw_editor() {
	editor_content.innerHTML = 
		editor.innerText.replaceAll(
			"<", "&lt;").replaceAll(
			"-", "&#8288;-&#8288;").replaceAll(
			"\n\n", "\n") + '\n';
	microlight.reset();
}
//somehow this fixes newline issues when loading content with newlines
editor.innerHTML = 
	editor.innerText.replaceAll(
		"\n\n", "<div><br></div>").replaceAll(
		"\n", "<div></div>");
//microlight.reset();
redraw_editor();

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
