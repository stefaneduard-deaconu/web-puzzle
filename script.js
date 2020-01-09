var puzzlePieces = [
    {
        "id": "1",
        "src": "1.jpg"
    },
    {
        "id": "2",
        "src": "2.jpg"
    },
    {
        id: "3",
        src: "3.jpg"
    },
    {
        id: "4",
        src: "4.jpg"
    },
    {
        id: "5",
        src: "5.jpg"
    },
    {
        id: "6",
        src: "6.jpg"
    },
    {
        id: "7",
        src: "7.jpg"
    },
    {
        id: "8",
        src: "8.jpg"
    },
    {
        id: "9",
        src: "9.jpg"
    }
]

//where we need to fit the pieces
var piecePlaces = {}

window.onload = function() {

    var pictureDiv = document.getElementById('picture')
    var puzzleDiv = document.getElementById('puzzle')
    pictureDiv.children[0].src = `./media/puzzle.jpg`

    // the image is loaded
    var imageXYRatio = pictureDiv.children[0].clientWidth / pictureDiv.children[0].clientHeight
    console.log(imageXYRatio)
    

    console.log("here")
    for (let piece of puzzlePieces) {
        var spot = document.createElement("div")
        spot.id = `spot${piece["id"]}`
        
            
        //generate a random location, on the screen, for the top-left location
        var width = window.innerWidth
        var height = window.innerHeight
        
        
        // in
        let pieceHeight = height * 0.7 / 3
        let pieceWidth = pieceHeight * imageXYRatio

        spot.style.width = pieceWidth
        spot.style.height = pieceHeight

        if (parseInt(puzzlePieces.indexOf(piece)) % 3 == 0) { // do this on resize :)))
            spot.style.marginLeft = (width - 3 * pieceWidth - 6) / 2
        }
        
        let rowNum = parseInt(puzzlePieces.indexOf(piece) / 3)
        let colNum = puzzlePieces.indexOf(piece) % 3
        console.log(spot)
        console.log(rowNum)
        puzzleDiv.children[rowNum].appendChild(spot)


        var image = document.createElement("div")
        image.classList.add("piece")
        image.style.backgroundImage = 'url(media/puzzle.jpg)'
        image.style.backgroundSize = '300%'
        image.style.backgroundPositionX = `${50 * colNum}%`
        image.style.backgroundPositionY = `${50 * rowNum}%`
        image.style.zIndex = puzzlePieces.indexOf(piece)
        image.style.width = pieceWidth
        image.style.height = pieceHeight

        // modify in some way
        image.id = `piece${piece["id"]}`

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

        puzzleDiv.appendChild(image)
    }

    
    for (let piece of document.querySelectorAll("#puzzle>.row>div")) {
        var pieceBounds = piece.getBoundingClientRect()
        piecePlaces[piece.id] = {
            x: pieceBounds.top,
            y: pieceBounds.left
        }
    }
    console.log(piecePlaces)

}