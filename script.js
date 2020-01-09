//where we need to fit the pieces
var piecePlaces = {}

window.onload = function() {

    var pictureDiv = document.getElementById('picture')
    var puzzleDiv = document.getElementById('puzzle')

    // doua tipuri de a deschide
    pictureDiv.addEventListener('drop', function(e) {
        console.log('File dropped');
        ev.preventDefault();
      
        if (e.dataTransfer.items) {
          // Use DataTransferItemList interface to access the file(s)
          for (var i = 0; i < e.dataTransfer.items.length; i++) {
            // Alegem doar fisierele, deci pentru fiecare fisier:
            if (e.dataTransfer.items[i].kind === 'file') {
              var file = ev.dataTransfer.items[i].getAsFile();
              console.log('... item[' + i + '].name = ' + file.name);
            }
          }
        } else {
          // Use DataTransfer interface to access the file(s)
          for (var i = 0; i < e.dataTransfer.files.length; i++) {
            console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
          }
        }
        // pictureDiv.children[0].src = 
    })
    pictureDiv.addEventListener('dragover', function(e) {
        ev.preventDefault();
    })


    pictureDiv.children[0].src = `./media/puzzle.jpg`

    // the image is loaded
    var imageXYRatio = pictureDiv.children[0].clientWidth / pictureDiv.children[0].clientHeight
    console.log(imageXYRatio)
    

    console.log("here")
    for (let id of [1,2,3,4,5,6,7,8,9]) {
        var spot = document.createElement("div")
        spot.id = `spot${id}`
        
            
        //generate a random location, on the screen, for the top-left location
        var width = window.innerWidth
        var height = window.innerHeight
        
        
        // in
        let pieceHeight = height * 0.7 / 3
        let pieceWidth = pieceHeight * imageXYRatio

        spot.style.width = pieceWidth
        spot.style.height = pieceHeight

        if (parseInt((id - 1)) % 3 == 0) { // do this on resize :)))
            spot.style.marginLeft = (width - 3 * pieceWidth - 6) / 2
        }
        
        let rowNum = parseInt((id - 1) / 3)
        let colNum = (id - 1) % 3
        console.log(spot)
        console.log(rowNum)
        puzzleDiv.children[rowNum].appendChild(spot)


        var image = document.createElement("div")
        image.classList.add("piece")
        image.style.backgroundImage = 'url(media/puzzle.jpg)'
        image.style.backgroundSize = '300%'
        image.style.backgroundPositionX = `${50 * colNum}%`
        image.style.backgroundPositionY = `${50 * rowNum}%`
        image.style.zIndex = (id - 1)
        image.style.width = pieceWidth
        image.style.height = pieceHeight

        // modify in some way
        image.id = `piece${id}`

        image.draggable = true
        image.ondragstart = function(e) {
            // e.preventDefault()
            console.log(e.target.getBoundingClientRect())
            e.dataTransfer.setData('text', e.target.id)
        }

        
        spot.ondragover = function(e) {
            e.preventDefault()
        }
        spot.ondrop = function(e) {
            e.preventDefault()
            let imageID = e.dataTransfer.getData('text')
            if (imageID.charAt(5) == e.target.id.charAt(4)) {
                let thisImage = document.getElementById(imageID)
                // console.log("IMP)" + e.target.style.)
                // to keep the centering of the puzzle:
                thisImage.style.marginLeft = e.target.style.marginLeft
                thisImage.draggable = false
                thisImage.style.zIndex = 0
                thisImage.className = 'placed-piece'
                e.target.parentNode.replaceChild(thisImage, e.target)
                // :))))))
                let placedPieces = document.querySelectorAll('.placed-piece')
                if (document.querySelectorAll(".piece").length == 0) // am plasat corect toate piesele :D
                    for (let pc of placedPieces) {
                        pc.style.border = "none"
                    }
            }   
            // else
            //     e.target.innerHTML = "bad"
            // console.log(e.target.getBoundingClientRect())
            
        }
        puzzleDiv.ondragover = function(e) {
            e.preventDefault()
        }
        puzzleDiv.ondrop = function(e) {
            console.log(event.clientX)
            console.log(event.clientY)
            e.preventDefault()
            if (e.target.children.length > 0)
                imageDiv = e.target.children[0]
            puzzleDiv.style.left = e.clientX
            puzzleDiv.style.top = e.clientY
        }

        // before appending it, we need to chose its position:
        // (1) we compute possible positions

        // (2) we randomly choose one
        minY = puzzleDiv.getBoundingClientRect().top
        maxY = puzzleDiv.getBoundingClientRect().bottom - pieceHeight
        maxX = puzzleDiv.clientWidth - pieceWidth
        console.log(maxX)
        // y must be between minY and maxY
        y = Math.random() * (maxY - minY) + minY
        // x must be less than maxX
        x = Math.random() * maxX
        image.style.top = y
        image.style.left = x
        puzzleDiv.appendChild(image)
    }

    // this is after adding all the pieces
    for (let piece of document.querySelectorAll("#puzzle>.row>div")) {
        var pieceBounds = piece.getBoundingClientRect()
        piecePlaces[piece.id] = {
            x: pieceBounds.top,
            y: pieceBounds.left
        }
    }
    console.log(piecePlaces)

}