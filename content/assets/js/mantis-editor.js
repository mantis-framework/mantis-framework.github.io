let editor_container = document.getElementById("editor-container");
let editor_content = document.getElementById("editor-content");
let editor = document.getElementById('editor');

let pos = 0, 
    length = 0,
    line_no = 0,
    no_lines = 1;

const bsKey     = 8,
      tabKey    = 9,
      enterKey  = 13,
      shiftKey  = 16,
      ctrlKey   = 17,
      altKey    = 18,
      capsKey   = 20,
      escKey    = 27,
      leftKey   = 37,
      upKey     = 38,
      rightKey  = 39,
      downKey   = 40,
      insertKey = 45, //fn return/enter
      delKey    = 46, //fn bs
      metaKey   = 91; //cmd


function new_editor_content_size() {
	editor.style.marginTop = - (editor_content.clientHeight) + "px";
}
new ResizeObserver(() => new_editor_content_size()).observe(editor_content);

function redraw_editor() {
	editor_content.innerHTML = 
		editor.innerText.replaceAll(
			"<", "&lt;").replaceAll(
			"-", "&#8288;-&#8288;").replaceAll(
			"\n\n", "\n") + '\n';
	microlight.reset();
}
//fixes newline issues when loading content with newlines
editor.innerHTML = 
	editor.innerText.replaceAll(
		"\n\n", "<div><br></div>").replaceAll(
		"\n", "<div></div>") + '\n';
//microlight.reset();
redraw_editor();

function insert_tab() {
	if(!window.getSelection)
		return;
	const sel = window.getSelection();

	if(!sel.rangeCount)
		return;
	const range = sel.getRangeAt(0);
	range.collapse(true);

	const span = document.createElement('span');
	span.appendChild(document.createTextNode('\t'));
	span.style.whiteSpace = 'pre';

	range.insertNode(span);
	// Move the caret immediately after the inserted span
	range.setStartAfter(span);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
}

function key_press_old(e) {
	let key = e.keyCode;

	if(key == tabKey){
		e.preventDefault();
		insert_tab();
	}
	/*else if(
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
		++pos;*/

	redraw_editor();
}


const mantis_editor = document.getElementById("mantis-editor");

function redraw_mantis_editor() {
	mantis_editor.innerHTML = 
		mantis_editor.innerText.replaceAll(
			"<", "&lt;").replaceAll(
			"-", "&#8288;-&#8288;").replaceAll(
			"\n\n", "\n") + '\n';
	microlight.reset();
}

function key_press(e) {
	console.log("key_press");


	switch(e.keyCode) {
		case shiftKey :
			return;
		case capsKey:
			e.preventDefault();
			return;
	}


	if(!window.getSelection)
		return;
	const sel = window.getSelection();
	let currentNode = sel.focusNode.parentNode;
	let to_check = [mantis_editor];
	let pos = sel.focusOffset, childNo = 0;

	console.log("focusNodeText: " + sel.focusNode.textContent);

	//does it matter if this is bfs or dfs?
	//presumably elements of lines can have children?
	for(let i=0; i<to_check.length; ++i) {
		for(let n=0; n<to_check[i].childNodes.length; ++n) {
			if(to_check[i].childNodes[n] == sel.focusNode) {
				console.log("YA");
				i = to_check.length;
				break;
			}

			if(to_check[i].childNodes[n].nodeType == 3) {
				pos += to_check[i].childNodes[n].textContent.length;
				console.log("editor kid: " + to_check[i].childNodes[n].textContent);
			}
			else {
				if(to_check[i].childNodes[n].childNodes.length)
					to_check.push(to_check[i].childNodes[n]);
				else
					++pos;
				console.log("fuck yeah baby " + to_check[i].childNodes[n].childNodes.length);
			}
		}
	}

	console.log(pos);
	
	if(e.keyCode = tabKey)
		e.preventDefault();

	let offset = 0, txt = mantis_editor.innerText;

	switch(e.keyCode) {
		case bsKey:
			if(!pos)
				return;
			--pos;
			if(pos < txt.length)
				mantis_editor.innerHTML = txt.slice(0, pos) + txt.slice(pos+1);
			else
				mantis_editor.innerHTML = txt.slice(0, pos);
			break;
		case leftKey:
			e.preventDefault();
			if(pos)
				--pos;
			//alert(pos);
			break;
		case rightKey:
			e.preventDefault();
			if(pos < mantis_editor.innerHTML.length)
				++pos;
			break;
		case tabKey:
			if(pos < txt.length)
				mantis_editor.innerHTML = txt.slice(0, pos) + '\t' + txt.slice(pos);
			else
				mantis_editor.innerHTML = txt.slice(0, pos) + '\t';
			++pos;
			break;
		case enterKey:
			if(pos < txt.length)
				mantis_editor.innerHTML = txt.slice(0, pos) + '\n' + txt.slice(pos);
			else
				mantis_editor.innerHTML = txt.slice(0, pos) + '\n';
			++pos;
			break;
		default:
			if(pos < txt.length)
				mantis_editor.innerHTML = txt.slice(0, pos) + e.key + txt.slice(pos);
			else
				mantis_editor.innerHTML = txt.slice(0, pos) + e.key;
			++pos;
	}

	//redraw_mantis_editor();
	microlight.reset();

	// Move the caret immediately after the inserted span
	if(!sel.rangeCount)
		return;
	const range = sel.getRangeAt(0);

	//does it matter if this is bfs or dfs?
	to_check = [mantis_editor];
	for(let i=0; i<to_check.length; ++i) {
		for(let n=0; n<to_check[i].childNodes.length; ++n) {
			if(to_check[i].childNodes[n].nodeType == 3) {
				if(pos < to_check[i].childNodes[n].length) {
					console.log("should have happened");
					if(e.keyCode == leftKey) {
						range.setStart(to_check[i].childNodes[n], pos);
						range.setEnd(  to_check[i].childNodes[n], pos);
					}
					else
						range.setStart(to_check[i].childNodes[n], pos);
					i = to_check.length;
					break;
				}
				else
					pos -= to_check[i].childNodes[n].textContent.length;
			}
			else {
				if(to_check[i].childNodes[n].childNodes.length)
					to_check.push(to_check[i].childNodes[n]);
				else if(pos)
					--pos;
				else {
					console.log("should have happened3.0");
					if(e.keyCode == leftKey) {
						range.setStart(to_check[i].childNodes[n], 0);
						range.setEnd(  to_check[i].childNodes[n], 0);
					}
					else
						range.setStart(to_check[i].childNodes[n], 0);
					i = to_check.length;
					break;
				}
			}
		}
	}
	console.log("POSSS: " + pos);


    sel.removeAllRanges();
    sel.addRange(range);
    //mantis_editor.focus();
}

//document.addEventListener('keydown', key_press, false);
//document.addEventListener('keyup'  , key_press, false);
