/**
@author Victor Maestri
@since 2016
**/


// Init a component
$.fn.sbxColorChoice = function (params) {

  const { reseteCor, removePallet, textResetColorButton, selecionarCor } = params
  let openChooseColor = false;

  //Function that close the component
  const closeChooseColor = (element) => {
    $('body').css('overflow', 'auto');
    element.slideUp('fast', function () {
      element.remove();
      openChooseColor = false;
    });
  }

  // Function that apply the color selected
  const chooseColor = (element, e) => {
    element.find('ul li').click(function () {
      const color = $(this).attr('data-color');
      closeChooseColor(element);
      selecionarCor(color, e);
    });
  }

  // Function that reset color
  const removePalletColor = () => {
    if (removePallet != '' && removePallet != undefined) {
      $('body').find(removePallet).remove();
    }
  }

  // Function that add a custom text in reset color button
  const constumResetTextButton = (element) => {
    if (textResetColorButton) {
      element.find(".reset-color-button").html(textResetColorButton);
    }
  }

  // Function that create modal's effect
  const effectModal = (element) => {
    element.slideDown('fast', function () {
      element.focus();
    });
  }

  // Function that mark where the pallet will open
  const positionElement = (element, e) => {
    const $target = $(e.target);
    const $targetPosicao = $target.offset();
    const $targetHeight = $target.height();
    const $targetWdith = $target.width();
    const $screenHeight = $(window).height();
    const $screenWidth = $(window).width();
    const $elementHeight = element.outerHeight();
    const $elementWidth = element.outerWidth();

    let top, left

    if ($targetPosicao.top + $elementHeight > $screenHeight) {
      top = $targetPosicao.top - $elementHeight - 12;
      var elementoPosicao = 'co-color-list--above';
    } else {
      top = $targetPosicao.top + $targetHeight + 12;
      var elementoPosicao = 'co-color-list--bellow';
    }

    if ($targetPosicao.left + $elementWidth > $screenWidth) {
      left = $targetPosicao.left - $targetWdith
      var elementoPosicao2 = 'co-color-list--right';
    } else {
      left = $targetPosicao.left
      var elementoPosicao2 = 'co-color-list--left';
    }

    element.find('ul.color-reset li').attr('data-color', reseteCor);
    element.css({ 'top': top, 'left': left }).addClass([elementoPosicao, elementoPosicao2]);
  }

  /*Event click*/
  $(this).click(function (e) {
    if (!openChooseColor) {
      $.get("choose-color.html", function (data) {
        const $element = $(data);

        $('body').append($element);
        $('body').css('overflow', 'hidden');

        positionElement($element, e)
        effectModal($element)
        chooseColor($element, e)
        removePalletColor()
        constumResetTextButton($element)

        $element.focusout(() => closeChooseColor($element));

        openChooseColor = true;
      });
    }

  });
}
