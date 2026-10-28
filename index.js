// ONLY define the timeline at the top
var timeline = [];

function simpleMarkdown(md) {
  const inline = s => s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  let html = '', inList = false, para = [];
  const flushPara = () => { if (para.length) { html += '<p>' + inline(para.join(' ')) + '</p>'; para = []; } };
  const closeList = () => { if (inList) { html += '</ul>'; inList = false; } };
  md.split(/\r?\n/).forEach(line => {
    let m;
    if (!line.trim()) { flushPara(); closeList(); }
    else if ((m = line.match(/^(#{1,6})\s+(.*)$/))) { flushPara(); closeList(); html += `<h${m[1].length}>${inline(m[2])}</h${m[1].length}>`; }
    else if ((m = line.match(/^\s*[-*+]\s+(.*)$/))) { flushPara(); if (!inList) { html += '<ul>'; inList = true; } html += '<li>' + inline(m[1]) + '</li>'; }
    else if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) { flushPara(); closeList(); html += '<hr>'; }
    else { closeList(); para.push(line.trim()); }
  });
  flushPara(); closeList();
  return html;
}

// Wrap your setup in an async function
async function startExperiment() {
  
  // Initialize jsPsych ONCE, with your on_finish settings
  var jsPsych = initJsPsych({
    on_finish: function() {
      // Disable the browser's leave site warning
      window.onbeforeunload = null;
      
      // Redirect to the next task
      window.location.href = "https://ky7itfm5ft.cognition.run?pid=" + encodeURIComponent(RUN_ID);
    }
  });

  // 1. Fetch the markdown file 
  const response = await fetch('assets/consentimiento_informado.md');
  const markdownText = await response.text();

  // 2. Convert the Markdown to HTML using marked.js
  
  const consent_html = simpleMarkdown(markdownText);
  //const consent_html = marked.parse(markdownText);

  // 3. Create the consent trial
  var consent_trial = {
    type: jsPsychHtmlButtonResponse, 
    stimulus: `
      <div style="max-width: 900px; margin: 0 auto; text-align: left; background-color: #f9f9f9; padding: 20px; border: 1px solid #ccc; max-height: 60vh; overflow-y: auto; font-size: 14px;">
        ${consent_html}
      </div>
    `,
    choices: ['Acepto participar'],
    margin_vertical: '20px'
  };



  var demographics_trial = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<h3>Por favor, complete la siguiente información</h3>',
    html: `
      <div style="margin-bottom: 30px; text-align: left;">
        <p style="margin-bottom: 5px;">País de nacimiento:</p>
        <input 
          type="text" 
          name="country_birth" 
          id="country_birth_input" 
          style="padding: 8px; font-size: 15px; width: 100%; max-width: 400px;" 
          required
        >
      </div>
      <div style="margin-bottom: 30px; text-align: left;">
        <p style="margin-bottom: 5px;">Pais y ciudad de residencia actual:</p>
        <input 
          type="text" 
          name="place_current" 
          id="place_current_input" 
          style="padding: 8px; font-size: 15px; width: 100%; max-width: 400px;" 
          required
        >
      </div>

      <div style="margin-bottom: 20px; text-align: left;">
        <p style="margin-bottom: 5px;">Fecha de nacimiento:</p>
        <input 
          type="date" 
          name="birthdate" 
          id="birthdate_input" 
          style="padding: 8px; font-size: 15px; font-family: inherit; cursor: pointer; width: 100%; max-width: 400px;" 
          required
        >
      </div>
      
      <div style="margin-bottom: 20px; text-align: left;">
        <p>Género:</p>
        <select name="gender_input" id="gender_select" style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" required>
          <option value="" disabled selected>Seleccione una opción...</option>
          <option value="Mujer">Mujer</option>
          <option value="Varon">Varon</option>
          <option value="No binarie">No binarie</option>
          <option value="Mujer trans">Mujer trans</option>
          <option value="Varon trans">Varon trans</option>
          <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
    `
  };

  var educational_level_trial = {
    type: jsPsychSurveyHtmlForm,
    html: `
      <div style="margin-bottom: 40px; text-align: left;">
        <p>¿Cuál es tu máximo nivel de estudios alcanzado?</p>
        <select name="Nivel_Educativo" id="edu-select-participant" style="padding: 8px; font-size: 15px; width: 100%; max-width: 400px;" required>
          <option value="" disabled selected>Seleccione una opción...</option>
          <option value="Primario incompleto">Primario incompleto</option>
          <option value="Primario en curso">Primario en curso</option>
          <option value="Primario completo">Primario completo</option>
          <option value="Secundario incompleto">Secundario incompleto</option>
          <option value="Secundario en curso">Secundario en curso</option>
          <option value="Secundario completo">Secundario completo</option>
          <option value="Terciario incompleto">Terciario incompleto</option>
          <option value="Terciario en curso">Terciario en curso</option>
          <option value="Terciario completo">Terciario completo</option>
          <option value="Universitario incompleto">Universitario incompleto</option>
          <option value="Universitario en curso">Universitario en curso</option>
          <option value="Universitario completo">Universitario completo</option>
          <option value="Posgrado incompleto">Posgrado incompleto</option>
          <option value="Posgrado en curso">Posgrado en curso</option>
          <option value="Posgrado completo">Posgrado completo</option>
        </select>
      </div>

      <div style="margin-bottom: 20px; text-align: left;">
        <p>¿Cuál es el máximo nivel de estudios alcanzado por tu <strong>madre/cuidadora</strong> principal??</p>
        <select name="educational_level_mother" id="edu-select-mother" style="padding: 8px; font-size: 15px; width: 100%; max-width: 400px;" required>
          <option value="" disabled selected>Seleccione una opción...</option>
          <option value="Primario incompleto">Primario incompleto</option>
          <option value="Primario en curso">Primario en curso</option>
          <option value="Primario completo">Primario completo</option>
          <option value="Secundario incompleto">Secundario incompleto</option>
          <option value="Secundario en curso">Secundario en curso</option>
          <option value="Secundario completo">Secundario completo</option>
          <option value="Terciario incompleto">Terciario incompleto</option>
          <option value="Terciario en curso">Terciario en curso</option>
          <option value="Terciario completo">Terciario completo</option>
          <option value="Universitario incompleto">Universitario incompleto</option>
          <option value="Universitario en curso">Universitario en curso</option>
          <option value="Universitario completo">Universitario completo</option>
          <option value="Posgrado incompleto">Posgrado incompleto</option>
          <option value="Posgrado en curso">Posgrado en curso</option>
          <option value="Posgrado completo">Posgrado completo</option>
        </select>
      </div>
      
      <div style="margin-bottom: 20px; text-align: left;">
      <p>¿Cuál es el máximo nivel de estudios alcanzado por tu <strong>padre o figura paterna</strong> principal??</p>
        <select name="educational_level_father" id="edu-select-father" style="padding: 8px; font-size: 15px; width: 100%; max-width: 400px;" required>
          <option value="" disabled selected>Seleccione una opción...</option>
          <option value="Primario incompleto">Primario incompleto</option>
          <option value="Primario en curso">Primario en curso</option>
          <option value="Primario completo">Primario completo</option>
          <option value="Secundario incompleto">Secundario incompleto</option>
          <option value="Secundario en curso">Secundario en curso</option>
          <option value="Secundario completo">Secundario completo</option>
          <option value="Terciario incompleto">Terciario incompleto</option>
          <option value="Terciario en curso">Terciario en curso</option>
          <option value="Terciario completo">Terciario completo</option>
          <option value="Universitario incompleto">Universitario incompleto</option>
          <option value="Universitario en curso">Universitario en curso</option>
          <option value="Universitario completo">Universitario completo</option>
          <option value="Posgrado incompleto">Posgrado incompleto</option>
          <option value="Posgrado en curso">Posgrado en curso</option>
          <option value="Posgrado completo">Posgrado completo</option>
        </select>
      </div>
    `
  };

  var childhood_cohabitation_trial = {
    type: jsPsychSurveyHtmlForm,
    html: `
      <div style="margin-bottom: 30px; text-align: left; max-width: 800px; margin: 0 auto;">
        <p style="margin-bottom: 10px; font-size: 16px;">
          Pensando en el período de tu crianza durante la mayor parte de tu infancia y adolescencia, ¿con quién conviviste o pasaste la mayor parte del tiempo?
        </p>
        
        <select name="childhood_cohabitation" id="cohabitation_select" style="padding: 8px; font-size: 15px; width: 100%; margin-bottom: 15px;" required>
          <option value="" disabled selected>Seleccione una opción...</option>
          <option value="Exclusivamente madre">Exclusivamente o casi exclusivamente con mi madre (o figura materna)</option>
          <option value="Mayoritariamente madre">Mayoritariamente con mi madre (o figura materna), pero también con mi padre (o figura paterna)</option>
          <option value="Mismo tiempo ambos">Aproximadamente el mismo tiempo con ambos</option>
          <option value="Mayoritariamente padre">Mayoritariamente con mi padre (o figura paterna), pero también con mi madre (o figura materna)</option>
          <option value="Exclusivamente padre">Exclusivamente o casi exclusivamente con mi padre (o figura paterna)</option>
          <option value="Otro">Otro/s (especificar abajo)</option>
        </select>
        
        <p style="margin-bottom: 5px; font-size: 14px; color: #555;">Si seleccionaste "Otro/s", por favor especificá:</p>
        <input 
          type="text" 
          name="childhood_cohabitation_other" 
          id="cohabitation_other_input" 
          style="padding: 8px; font-size: 15px; width: 100%;"
          placeholder="Especificar..."
        >
      </div>
    `,
    button_label: 'Continuar'
  };

  var macarthur_scale_trial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `
    <div style="margin-bottom: 30px; text-align: left; max-width: 800px; margin: 0 auto; font-size: 15px;">
        <p>Imagine que esta escalera representa el lugar que ocupan las personas en nuestra sociedad.</p>
        <p>En la parte superior de la escalera se encuentran las personas que están en una mejor posición:
        los que tienen más dinero, mayor nivel educativo y los mejores empleos.</p>
        <p>En la parte inferior de la escalera están las personas que están en la peor posición: 
        los que tienen menos dinero, el menor nivel educativo y los empleos más precarios o no tienen empleo.</p>
        <p>Cuanto más alto te consideres en esta escalera, más cerca estarás de las personas que se encuentran
        en la cima; y cuanto más bajo, más cerca estarás de las personas que se encuentran en la base. 
        
        <p><strong>¿En qué lugar de esta escalera te ubicarías? </strong></p>
      </div>
    `,
    html: `
      <div style="display: flex; justify-content: center; align-items: stretch; gap: 40px; margin-bottom: 20px;">
        
        <div>
          <img src="assets/ladder.png" alt="MacArthur Ladder" style="height: 350px; width: auto;">
        </div>
        
        <div style="display: flex; flex-direction: column; justify-content: space-between; text-align: left; padding: 10px 0;">
          <label><input type="radio" name="MacArthur_SSS" value="10" required> 10</label>
          <label><input type="radio" name="MacArthur_SSS" value="9"> 9</label>
          <label><input type="radio" name="MacArthur_SSS" value="8"> 8</label>
          <label><input type="radio" name="MacArthur_SSS" value="7"> 7</label>
          <label><input type="radio" name="MacArthur_SSS" value="6"> 6</label>
          <label><input type="radio" name="MacArthur_SSS" value="5"> 5</label>
          <label><input type="radio" name="MacArthur_SSS" value="4"> 4</label>
          <label><input type="radio" name="MacArthur_SSS" value="3"> 3</label>
          <label><input type="radio" name="MacArthur_SSS" value="2"> 2</label>
          <label><input type="radio" name="MacArthur_SSS" value="1"> 1</label>
        </div>
        
      </div>
    `,
    button_label: 'Continuar'
  };

  // Note: I added educ_level_self to the timeline here!
  timeline.push(consent_trial, demographics_trial, educational_level_trial, childhood_cohabitation_trial, macarthur_scale_trial);

  jsPsych.run(timeline);

}

startExperiment();