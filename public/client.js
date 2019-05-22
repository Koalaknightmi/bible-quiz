// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('hello world :o');

let dreams = [];
var h1 = " In the past God spoke to our ancestors through the prophets at many times and in various ways, 2 but in these last days he has spoken to us by his Son, whom he appointed heir of all things, and through whom also he made the universe. 3 The Son is the radiance of God’s glory and the exact representation of his being, sustaining all things by his powerful word. After he had provided purification for sins, he sat down at the right hand of the Majesty in heaven. 4 So he became as much superior to the angels as the name he has inherited is superior to theirs.5 For to which of the angels did God ever say,“You are my Son; today I have become your Father”?Or again,“I will be his Father, and he will be my Son”?6 And again, when God brings his firstborn into the world, he says,“Let all God’s angels worship him.”7 In speaking of the angels he says,“He makes his angels spirits, and his servants flames of fire.”8 But about the Son he says,“Your throne, O God, will last for ever and ever; a scepter of justice will be the scepter of your kingdom.9 You have loved righteousness and hated wickedness; therefore God, your God, has set you above your companions by anointing you with the oil of joy.”10 He also says,“In the beginning, Lord, you laid the foundations of the earth, and the heavens are the work of your hands.11 They will perish, but you remain; they will all wear out like a garment.12 You will roll them up like a robe; like a garment they will be changed.But you remain the same, and your years will never end.”13 To which of the angels did God ever say,“Sit at my right hand until I make your enemies a footstool for your feet”?14 Are not all angels ministering spirits sent to serve those who will inherit salvation?";
var h2 = " We must pay the most careful attention, therefore, to what we have heard, so that we do not drift away. 2 For since the message spoken through angels was binding, and every violation and disobedience received its just punishment, 3 how shall we escape if we ignore so great a salvation? This salvation, which was first announced by the Lord, was confirmed to us by those who heard him. 4 God also testified to it by signs, wonders and various miracles, and by gifts of the Holy Spirit Distributed according to his will.5 It is not to angels that he has subjected the world to come, about which we are speaking. 6 But there is a place where someone has testified:“What is mankind that you are mindful of them,    a son of man that you care for him?7 You made them a little lower than the angels;    you crowned them with glory and honor 8  and put everything under their feet.”In putting everything under them, God left nothing that is not subject to them. Yet at present we do not see everything subject to them. 9 But we do see Jesus, who was made lower than the angels for a little while, now crowned with glory and honor because he suffered death, so that by the grace of God he might taste death for everyone.10 In bringing many sons and daughters to glory, it was fitting that God, for whom and through whom everything exists, should make the pioneer of their salvation perfect through what he suffered. 11 Both the one who makes people holy and those who are made holy are of the same family. So Jesus is not ashamed to call them brothers and sisters. 12 He says,“I will declare your name to my brothers and sisters;    in the assembly I will sing your praises.”13 And again,“I will put my trust in him.”And again he says,“Here am I, and the children God has given me.”14 Since the children have flesh and blood, he too shared in their humanity so that by his death he might break the power of him who holds the power of death—that is, the devil— 15 and free those who all their lives were held in slavery by their fear of death. 16 For surely it is not angels he helps, but Abraham’s descendants. 17 For this reason he had to be made like them, fully human in every way, in order that he might become a merciful and faithful high priest in service to God, and that he might make atonement for the sins of the people. 18 Because he himself suffered when he was tempted, he is able to help those who are being tempted."
h1 = h1.split(/[0-9]+/);
h2 = h2.split(/[0-9]+/);

dreams = h1;
console.log(h1)
console.log(h2)
// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function to call when our request for dreams is done
const getDreamsListener = function() {
  // parse our response to convert to JSON
  dreams = JSON.parse(this.responseText);

  // iterate through every dream and add it to our page
  dreams.forEach( function(row) {
    appendNewDream(row.dream);
  });
}

// request the dreams from our app's sqlite database
const dreamRequest = new XMLHttpRequest();
dreamRequest.onload = getDreamsListener;
dreamRequest.open('get', '/getDreams');
dreamRequest.send();

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};
