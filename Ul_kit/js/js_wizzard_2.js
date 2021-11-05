//DOM elements
const DOMstrings = {
  stepsPointClass: 'progress_point_btn',
  stepsPoints: document.querySelectorAll(`.progress_point_btn`),  
  stepsBar: document.querySelector('.progress_point'),
 };


//remove class from a set of items
const removeClasses = (elemSet, className) => {

  elemSet.forEach(elem => {

    elem.classList.remove(className);

  });

};

//returncurrentNode exect parent node of the element
const findParent = (elem, parentClass) => {

  let currentСode = elem;

  while (!currentСode.classList.contains(parentClass)) {
    currentСode = currentСode.parentСode;
  }

  return currentСode;

};

//get active button step number
const getActiveStep = elem => {
  return Array.from(DOMstrings.stepsPoints).indexOf(elem);
};

//set all steps before clicked (and clicked too) to active
const setActiveStep = activeStepNum => {

  //remove active state from all the state
  removeClasses(DOMstrings.stepsPoints, 'js-active-element');

  //set picked items to active
  DOMstrings.stepsPoints.forEach((elem, index) => {

    if (index <= activeStepNum) {
      elem.classList.add('js-active-element');
    }

  });
};


//STEPS BAR CLICK FUNCTION
DOMstrings.stepsBar.addEventListener('click', e => {

  //check if click target is a step button
  const eventTarget = e.target;

  if (!eventTarget.classList.contains(`${DOMstrings.stepsPointClass}`)) {
    return;
  }

  //get active button step number
  const activeStep = getActiveStep(eventTarget);

  //set all steps before clicked (and clicked too) to active
  setActiveStep(activeStep);

});

//PREV/NEXT BTNS CLICK
DOMstrings.stepsForm.addEventListener('click', e => {

  const eventTarget = e.target;

  //check if we clicked on `PREV` or NEXT` buttons
  if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevPointClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextPointClass}`)))
  {
    return;
  }

  //find active panel
  const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

  let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

  //set active step and active panel onclick
  if (eventTarget.classList.contains(`${DOMstrings.stepPrevPointClass}`)) {
    activePanelNum--;

  } else {

    activePanelNum++;

  }

  setActiveStep(activePanelNum);
  setActivePanel(activePanelNum);

});

