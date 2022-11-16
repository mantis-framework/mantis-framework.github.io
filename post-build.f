chmod u+w output/assets/js/bundled.js
mantis-minify --dir output/assets/js/ --js output/assets/js/bundled.js

chmod u+w output/assets/css/bundled.css
mantis-minify --dir output/assets/css/ --css output/assets/css/bundled.css

chmod u+w output/*.html
mantis-minify --dir output/ --html output/*.html
