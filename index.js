var jsPsych = initJsPsych();

var timeline = [];

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
        style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" 
        required
      >
    </div>
    <div style="margin-bottom: 30px; text-align: left;">
      <p style="margin-bottom: 5px;">Pais y lugar de residencia actual:</p>
      <input 
        type="text" 
        name="place_current" 
        id="place_current_input" 
        style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" 
        required
      >
    </div>

    <div style="margin-bottom: 20px; text-align: left;">
      <p style="margin-bottom: 5px;">Fecha de nacimiento:</p>
      <input 
        type="date" 
        name="birthdate" 
        id="birthdate_input" 
        style="padding: 8px; font-size: 16px; font-family: inherit; cursor: pointer; width: 100%; max-width: 400px;" 
        required
      >
    </div>
    
    <div style="margin-bottom: 20px; text-align: left;">
      <p>Género:</p>
      <select name="gender_input" id="gender_select" style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" required>
        <option value="" disabled selected>Seleccione una opción...</option>
        <option value="Femenino">Femenino</option>
        <option value="Masculino">Masculino</option>
        <option value="No binario">No binario</option>
        <option value="Otro">Otro</option>
        <option value="Prefiero no decirlo">Prefiero no decirlo</option>
      </select>
    </div>
  `
};

var educational_level_trial = {
  type: jsPsychSurveyHtmlForm,
 // preamble: '<h3>Por favor, responda las siguientes preguntas</h3>',
  html: `
    <div style="margin-bottom: 40px; text-align: left;">
      <p>¿Cuál es tu máximo nivel de estudios alcanzado?</p>
      <select name="Nivel_Educativo" id="edu-select-participant" style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" required>
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
      <p>¿Cuál es el maximo nivel de estudios alcanzado por tu <strong>madre</strong>?</p>
      <select name="educational_level_mother" id="edu-select-mother" style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" required>
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
      <p>¿Cuál es el maximo nivel de estudios alcanzado por tu <strong>padre</strong>?</p>
      <select name="educational_level_father" id="edu-select-father" style="padding: 8px; font-size: 16px; width: 100%; max-width: 400px;" required>
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


var educ_level_self = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "What is your age group?",
      name: 'Age_Group',
      options: [
        "Under 18",
        "18-24",
        "25-34",
        "35-44",
        "45-54",
        "55-64",
        "65 or older"
      ],
      required: true // Optional, but recommended for demographic data
    }
  ]
};

var macarthur_scale_trial = {
  type: jsPsychSurveyHtmlForm,
  preamble: `
    <div style="margin-bottom: 20px;">
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
    <!-- Flexbox container aligns the image and options side-by-side -->
    <div style="display: flex; justify-content: center; align-items: stretch; gap: 40px; margin-bottom: 20px;">
      
      <!-- Left side: The Ladder Image -->
      <div>
        <!-- Adjust the height here to match the height of your specific image -->
        <img src="img/ladder.png" alt="MacArthur Ladder" style="height: 350px; width: auto;">
      </div>
      
      <!-- Right side: The Vertical Options -->
      <!-- 'justify-content: space-between' stretches the radio buttons to match the image height -->
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
  `
};

// Add both to your timeline
// timeline.push(age_exact_trial, age_group_trial);

timeline.push(demographics_trial, educational_level_trial,
              macarthur_scale_trial);

jsPsych.run(timeline);