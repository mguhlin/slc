'use strict';
const $ = id => document.getElementById(id);
const responses = new Map();
let current;
const contexts = [
 'Water density: 1.0 g/cm³. Each block is solid.',
 'Same mass: 1 kg. Measure height from the ground.',
 'From rest, the paddle pushes water backward.',
 'Look closely. Choose a rock and explain.',
 'Choose the relationship that benefits both organisms.',
 'Same sugar mass and water volume. All sugar can dissolve.',
 'Use distance ÷ time. All rovers travel straight.',
 'Same size and starting temperature. Same hot water.',
 'A farm needs to reduce fertilizer runoff.',
 'Choose the case where humans select inherited traits.',
 'The sealed system stays closed. Nothing escapes.',
 'Use acceleration = net force ÷ mass. Masses are total moving system masses.',
 'Match the wave to its medical use.',
 'Assume other storm-forming conditions are favorable.',
 'Look for a new surface with no developed soil.'
];
function save() {
 if (!current) return;
 const old = responses.get(current.id) || {};
 const choice = document.querySelector('input[name="choice"]:checked');
 responses.set(current.id, {choice: choice?.value || '', evidence: $('evidence').value, checked: old.checked || false});
}
function feedback(state) {
 $('feedback').hidden = !state.checked;
 if (!state.checked) return;
 $('result').textContent = state.choice === current.answer ? 'Your choice matches the evidence.' : `Revisit your choice. The supported answer is ${current.answer}.`;
 $('explanation').textContent = current.explanation;
 $('followup').textContent = current.followup;
}
function render() {
 current = challenges.find(c => c.id === $('challenge').value);
 const state = responses.get(current.id) || {choice:'',evidence:'',checked:false};
 const list = challenges.filter(c => c.grade === current.grade);
 const index = list.indexOf(current);
 $('position').textContent = `${index + 1} of ${list.length}`;
 $('title').textContent = current.title;
 $('teks').textContent = `Grade ${current.grade} · TEKS ${current.teks}`;
 $('context').textContent = contexts[challenges.indexOf(current)];
 $('poster').src = current.image;
 $('poster').alt = `${current.title} ${$('context').textContent} Choices: ${current.choices.map((c,i)=>`${'ABCD'[i]}: ${c}`).join('; ')}. Illustrations are simplified; use the given data.`;
 $('full').href = current.image;
 $('download').href = current.image;
 $('choices').replaceChildren();
 current.choices.forEach((text,i) => {
  const label = document.createElement('label'); label.className = 'choice';
  const input = document.createElement('input'); input.type = 'radio'; input.name = 'choice'; input.value = 'ABCD'[i]; input.checked = state.choice === input.value;
  const span = document.createElement('span'); span.textContent = `${input.value}. ${text}`;
  label.append(input,span); $('choices').append(label);
 });
 $('evidence').value = state.evidence;
 $('status').textContent = '';
 $('previous').disabled = index === 0;
 $('next').disabled = index === list.length - 1;
 feedback(state);
}
function changeGrade() {
 save(); const list = challenges.filter(c => c.grade === Number($('grade').value));
 $('challenge').replaceChildren(...list.map(c => {const o = document.createElement('option'); o.value = c.id; o.textContent = c.title; return o;}));
 render();
}
$('grade').addEventListener('change', changeGrade);
$('challenge').addEventListener('change', () => {save();render();});
$('response').addEventListener('submit', e => {
 e.preventDefault(); save(); const state = responses.get(current.id);
 if (!state.choice || !state.evidence.trim()) { $('status').textContent = 'Choose an answer and explain your evidence before checking.'; (!state.choice ? document.querySelector('input[name="choice"]') : $('evidence')).focus(); return; }
 state.checked = true; $('status').textContent = ''; feedback(state);
});
$('response').addEventListener('input', () => {if (current) {const s = responses.get(current.id); if(s) s.checked = false; $('feedback').hidden = true;}});
function move(delta) {save(); $('challenge').selectedIndex += delta; render(); $('title').setAttribute('tabindex','-1'); $('title').focus();}
$('previous').addEventListener('click', () => move(-1));
$('next').addEventListener('click', () => move(1));
$('print').addEventListener('click', () => window.print());
changeGrade();
