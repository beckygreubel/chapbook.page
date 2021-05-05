var paramsString = window.location; // get the current url
var searchParams = new URLSearchParams(paramsString.search); // get the search parameters from the url
var input = searchParams.get('input');
var numPoems = 12;

let photos = ['img1.jpeg', 
    'img2.jpeg', 
    'img3.jpeg', 
    'img4.jpeg', 
    'img5.jpeg', 
    'img6.jpeg', 
    'img7.jpeg', 
    'img8.jpeg', 
    'img9.jpeg', 
    'img10.jpeg', 
    'img11.jpeg', 
    'img12.jpeg', 
    'img13.jpeg'];

let exampleLines = [
        'sometimes I dream of a new place,',
        'a place where all the things', 
        'we hope for are true',
        'we are there',
        'floating,',
        'breathing, hoping and',
        'longing',
        'for a new time, a new place',
        'and yet here we stand',
        'in our current one,', 
        'lopsided and',
        'saddened by the way that we',
        'allow ourselves to destroy',
        'all that is around us',
        'destroying in the name of creating',
        'a creating that is lost at heart',
        'and overshadowed',
        'by our own selfish gain',
        'tomorrow we will awaken from this',
        'terrible long slumber',
        'and realize that we have',
        'burnt our hopes',
        'to the ground in the',
        'dream of making our life',
        'a living heaven',
        'and yet we have made it a hell',
        'lighting the night sky',
        'creating the mother',
        'disappears at dawn',
        'death sounds like sobbing',
        'death looks like a wilted flower',
        'orchid',
        'blooming and light',
        'tropical perfection',
        'paradise in a world of hate',
        'lovely',
        'in my dreams I am a ballerina',
        'I am graceful like a swan,',
        'twirling, leaping, soaring',
        'beautiful and glamorous',
        'would I be somewhere',
        'different if I',
        'actually had listened',
        'to myself when I spoke',
        'in my head about',
        'the ways that I want to be',
        'in this world, the shapes that I',
        'want to manifest',
        'and take up space in these shapes',
        'that have rigid and soft',
        'edges - rigid and soft',
        'around the edges was',
        'how I hoped to be and yet',
        'here I am wandering in',
        'a fog of my own creation',
        'mapless, crying on',
        'the path that I carved',
        'out of the lies',
        'I told myself in the hopes',
        'that others would think',
        'that I was soft and rigid',
        'like a knife in the back',
        'of a pillow',
        'one day I will learn',
        'that I must be more like myself',
        'if I am ever going to make it',
        'make it past my current barriers',
        'make it through the wall',
        'of my insecurity',
        'insecurity that gnaws at my insides',
        'until I am no longer whole',
        'but instead am small pieces',
        'that do not fit quite together',
        'you are here',
        'you are near',
        'you are staying close',
        'you are close to what you feel',
        'you feel like flying',
        'you fly away',
        'you are away',
        'away from what you love',
        'because you do not feel love'];

let last_b;
let synonyms = [];
let verbs = [];
let nouns = [];
let adverbs = ['entirely', 'carefully', 'often', 'seldom', 'fairly'];
let linesPOS = [];
last_a = input.toString();

lineByPOS();
findSynonyms(last_a).then(function(){

    todaysDate();
    for (let i = 0; i < numPoems; i++){
            let poem = makePoem(); 
            let photo = addPhoto();

            let img = document.createElement('img');
            img.src = photo;
            if (i % 3){
                img.classList.add('spread');
            } else {
                img.classList.add('break');
            }

            let div = document.createElement('div');
            div.classList.add('poem');
            poem.forEach(function(line){
                div.innerHTML += line + ' ';
                let randomNumBreaks = Math.floor(Math.random() * 5) + 1;
                for (let j = 0; j < randomNumBreaks; j++){
                    div.innerHTML += '<br>';
                }

            })

            document.getElementById('poemsHere').appendChild(img);
            document.getElementById('poemsHere').appendChild(div);           
        }
        let colors = [
            {coverColor: "#9EBAAF", innerColor: "#EAF5EC", accentColor: "#405A57"}, 
            {coverColor: "#9EA5BA", innerColor: "#E3E3E3", accentColor: "#587F8D"}, 
            {coverColor: "#BA9EB5", innerColor: "#F0EAF5", accentColor: "#8D5858"}, 
            {coverColor: "#BEBCA3", innerColor: "#F5F4EA", accentColor: "#8D5882"}]
    
          let randomColor = Math.floor(Math.random() * colors.length);
    
          let pageColorRule = Bindery.createRule({
              eachPage: function(page, book) {
              if (page.number == 1) {
                  page.background.style.backgroundColor = colors[randomColor].coverColor;
            } else {
                  page.background.style.backgroundColor = colors[randomColor].innerColor;
              }
          }
      });
    document.querySelectorAll('.title').forEach(function(title){
        title.innerHTML = input;
        title.style.color = colors[randomColor].accentColor;
     })
        let backPage = document.getElementById('backPage');
        backPage.style.backgroundColor = colors[randomColor].coverColor;
      
            Bindery.makeBook({
              content: '#content',
              view: Bindery.View.FLIPBOOK,
              pageSetup: {
                  size: {
                      width: '4in', height: '6in'
                  },
                  margin: {
                      top: '48pt', inner: '12pt', outer: '12pt', bottom: '12pt'
                  },
              },
              
              rules: [
                  pageColorRule,
                  // imageBorderRule,
                  Bindery.FullBleedSpread({
                      selector: '.spread',
                      continue: 'left',
                  }),
                  Bindery.FullBleedPage({
                      selector: '.break',
                  }),
                  Bindery.PageBreak({
                      selector: '#frontPage',
                      position: 'after'
                  }),
                  Bindery.PageBreak({ 
                    selector: '#backPage', 
                    position: 'before', 
                    continue: 'left' }),
                  Bindery.RunningHeader({
                      // render is a parameter to running header
                        render: (pageInfo, pages) => {
                            if (pageInfo.number === 1){
                                return ` `;
                            } else {
                                if (pageInfo.isLeft){
                                       return  ``;
                                    } else {
                                   return `${pageInfo.number-1} - ${pageInfo.number}`
                                }
                            } 
                        }
                  }),
                ]
            }); 
            document.getElementById('loading').style.opacity = 0;
            document.getElementById('loading').style.display = "none";
            
});

function addPhoto(){

    let randomPhoto = Math.floor(Math.random() * photos.length);
    let chosenPhoto = photos[randomPhoto];
    let photo = 'media/images/' + chosenPhoto;
    photos.splice(randomPhoto, 1);
    return photo;

}

function makePoem(){
    const maxNumLines = 10;
    let numLines = Math.floor(Math.random() * maxNumLines) + 5;
    let lines = [];
    for (let i = 0; i < numLines; i++){
        lines.push(createLine());
    }
    return lines;
}

function createLine(){
    let lineByToken = [];
    let randomPOS = Math.floor(Math.random() * linesPOS.length); 
    let lineStructure = linesPOS[randomPOS];
    let word;
    let line;
    if (Math.random() < .5){
        for (let k = 0; k < lineStructure.length; k++){
            if (lineStructure[k]=='to'){
                word = 'to';
            } else if (lineStructure[k] == 'in'){
                let possiblePreps = ['for', 'on', 'in', 'at', 'of', 'by'];
                let index = Math.floor(Math.random() * possiblePreps.length);
                word = possiblePreps[index];
            } else if (/nn.*/.test(lineStructure[k])){
                if (lineStructure[k] == 'nns'){
                    let plural = RiTa.pluralize(chooseSynonym())
                    if (plural){
                        word = plural
                    } else {
                        chooseSynonym();
                    }
                } else {
                    let newSyn = chooseSynonym();
                    if (newSyn){
                        word = newSyn
                    } else {
                        word = chooseNoun();
                    }
                }
             } else if (/vb.*/.test(lineStructure[k])) {
                word = chooseVerb();
            } else if (lineStructure[k] == 'ex') {
                word = 'there';
            } else if (lineStructure[k] == 'dt'){
                word = 'the';
            } else if (lineStructure[k] == 'cd'){
                word = 'one';
            } else if (lineStructure[k] == 'cc'){
                let ccs = ['and', 'for', 'but', 'and', 'nor', 'and', 'or', 'so', 'and', 'so']
                let index = Math.floor(Math.random() * ccs.length);
                word = ccs[index];
            } else if (lineStructure[k] == 'md'){
                let modal = ['can', 'could', 'may', 'should', 'must', 'might', 'may', 'could', 'should'];
                let index = Math.floor(Math.random() * modal.length);
                word = modal[index];
            } else if (lineStructure[k] == 'wrd'){
                let whWord = ['who', 'what', 'when', 'where', 'how', 'why'];
                let index = Math.floor(Math.random() * whWord.length);
                word = whWord[index];
            } else if (/prp.*/.test(lineStructure[k])){
                if (lineStructure[k] == 'prp$'){
                    let possessive = ['mine', 'yours', 'his', 'hers', 'theirs', 'ours'];
                    let index = Math.floor(Math.random() * possessive.length);
                    word = possessive[index];
                } else {
                    let possibleNouns = ['I', 'you', 'he', 'we', 'her', 'you', 'you', 'we', 'you']
                    let index = Math.floor(Math.random() * possibleNouns.length);
                    word = possibleNouns[index];
                }
            } else if (lineStructure[k] == 'jj') {
                word = chooseNoun();
            } else if (/rb.*/.test(lineStructure[k])){
                word = chooseAdverb();
            } else {
                word = ''
            }
            if (k > 0 && word == lineByToken[k-1]){
                word = ''
            }
            if (Math.random() <.2){
                lineByToken.push('&nbsp;');
                if (Math.random() < .4){
                    lineByToken.push('&nbsp;');
                    if (Math.random() < .3){
                        lineByToken.push('&nbsp;');
                    }
                }
            }
            lineByToken.push(word);
        }
    line = RiTa.untokenize(lineByToken);
    console.log(line);
    } else {
        if (exampleLines.length > 1){
            let randomLine = Math.floor(Math.random() * exampleLines.length);
            line = exampleLines[randomLine];
            exampleLines.splice[randomLine];
        } else {
            line = '';
        }
        
    }
    return line;
}

counter = 0;
function chooseSynonym(){
    let randomSyn = Math.floor(Math.random() * synonyms.length);
    let syn;
    if (counter < 5){
        syn = synonyms[randomSyn];
        counter += 1;
    } else if (counter == 5 && synonyms.length > 10){
        syn = synonyms[randomSyn];
        synonyms.splice(randomSyn);
        counter = 0;
    } else if (counter >=5 && synonyms.length < 10){
        if (Math.random() > .5){
            syn = chooseNoun();
        } else {
            syn = synonyms[randomSyn];
        }
    } else {
        syn = input;
    }
    return syn;
}

function chooseVerb(){
    let randomVerb = Math.floor(Math.random() * verbs.length);
    let verb = verbs[randomVerb];
    if (startsWithCapital(verb)){
       verb = verb.toLowerCase();
    }
    return verb;
}

function chooseAdverb(){
    let randomVerb = Math.floor(Math.random() * adverbs.length);
    let adverb = adverbs[randomVerb];
    if (startsWithCapital(adverb)){
       adverb = adverb.toLowerCase();
    }
    return adverb;
}

function chooseNoun(){
    let randomNoun = Math.floor(Math.random() * nouns.length);
    let noun = nouns[randomNoun];
    if (startsWithCapital(noun)){
        noun = noun.toLowerCase();
     }
    return noun;
}

async function findSynonyms(word){
    try {
        var results = await fetch(
            `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=true&relationshipTypes=synonym&limitPerRelationshipType=50&api_key=lfsv7wu4eq7pm2ymapwybd9z9dxq0u127siggnjw6i7te6i3u`
        )
    
        let Wordnik = await results.json();
        Wordnik[0].words.forEach(function(newWord){
            if (startsWithCapital(newWord) == false){
                synonyms.push(newWord);
            }
        });
        findSameContext(word);
        findEquivalent(word);
    } catch (error) {
        return synonyms.push(word);
    
    }
}

async function findSameContext(word){
    try {
        var results = await fetch(
            `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=true&relationshipTypes=same-context&limitPerRelationshipType=50&api_key=lfsv7wu4eq7pm2ymapwybd9z9dxq0u127siggnjw6i7te6i3u`
        )
    
        let Wordnik = await results.json();
        Wordnik[0].words.forEach(function(newWord){
            if (startsWithCapital(newWord) == false){
                synonyms.push(newWord);
            }
        });
    } catch (error) {
        return synonyms.push(word);
    }  
}

async function findEquivalent(word){
    try {
        var results = await fetch(
            `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=true&relationshipTypes=equivalent&limitPerRelationshipType=50&api_key=lfsv7wu4eq7pm2ymapwybd9z9dxq0u127siggnjw6i7te6i3u`
        )
    
        let Wordnik = await results.json();
        Wordnik[0].words.forEach(function(newWord){
            if (startsWithCapital(newWord) == false){
                synonyms.push(newWord);
            }
        })
    } catch (error) {
        return synonyms.push(word);
    }  
}

function startsWithCapital(word){
    return word.charAt(0) === word.charAt(0).toUpperCase()
}

function lineByPOS(){
    // lines from my poetry! A lot of different lines to help add variety
    for (let i = 0; i < exampleLines.length; i++){
        let tokenized = RiTa.tokenize(exampleLines[i]);
        let pos = RiTa.pos(tokenized);
        for (let j = 0; j < pos.length; j++){
            if (/vb.*/.test(pos[j])){
                verbs.push(tokenized[j]);
            }
            if (/nn.*/.test(pos[j])){
                nouns.push(tokenized[j]);
            }
            if (/rb.*/.test(pos[j])){
                adverbs.push(tokenized[j]);
            }
        }
        linesPOS.push(pos);
    }
}

function todaysDate(){
    var today = new Date();
    document.querySelectorAll('.meta-data').forEach(function(date){
        date.innerHTML = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    })
}
