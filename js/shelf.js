$(document).ready(function() {
    var item;
    var showList = document.getElementById("output-list");
    //the bookurl from my custom bookshelf
    var bookUrl = "https://www.googleapis.com/books/v1/users/112873665643904177188/bookshelves/1001/volumes";
   
  
    //incase the img not present: the placeholder from placeholder.com
    var pHolder = '<img src="https://via.placeholder.com/150">';
    
  
    
      showList.innerHTML = ""; 
      document.body.style.backgroundImage = "url('')";
   
         
         $.ajax({
            url: bookUrl,
            dataType: "json",
            success: function(response) {
            
              if (response.totalItems === 0) {
                alert("Error collecting Results!.. Retry")
              }
              else {
                //animating the search-box
                $("#title").animate({'margin-top': '5px'}, 1000); 
                
                $(".book-list").css("visibility", "visible");
                showResults(response);
              }
            },
            error: function () {
              alert("Error.. "+" Please retry!");
            }
          });
      
       
  
    
     function showResults(response) {
        console.log(response);

      // Display 
  
        for (var i = 0; i < response.items.length; i+=1) {
  
          //for card each
          item = response.items[i];
          title1 = item.volumeInfo.title;
          authors=item.volumeInfo.authors;
          publisher=item.volumeInfo.publisher;
          pages = item.volumeInfo.pageCount;
         
          Isbn = item.volumeInfo.industryIdentifiers[1].identifier
          Img1 = (item.volumeInfo.imageLinks) ? item.volumeInfo.imageLinks.thumbnail : pHolder ;
          
  
          showList.innerHTML += '<div class="row mt-4">' +
                                  outputforCard(Img1, title1, Isbn, authors,publisher,pages) 
                                 +
                                  '</div>';
  
          console.log(showList);
        }
     }
  
     
     function outputforCard(bookImg, title, bookIsbn,authors, publisher,page) {
       //display the small image of the book and a title with the link to the next page
       var displayUrl = 'viewbook-details.html?isbn='+bookIsbn; 
       var displayCard = `<div class="col-lg-6">
         <div class="card" style=" margin-left:40%; width: 700px;">
           <div class="row no-gutters">
             <div class="col-md-4">
               <img src="${bookImg}" class="card-img" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 
                 <h5 class="card-title" style="color:red;"><b>Book Title: </b>${title}</h5> 
                 <p style="color:black;"><b>Authors(s): </b>${authors}</p>
                 <p style="color:black;"><b>Publisher(s): </b>${publisher}</p>
                 <p style="color:black;"><b>Book Size: </b>${page} pages</p>
                 <br/>

                 <a  target="_blank" href="${displayUrl}" style="background: yellow; 
                 margin-left: 90px; padding:5px; justify-content: center;"> Read More</a>
                 
                 
                 
               </div>
             </div>
           </div>
         </div>
       </div>`
       return displayCard;
     }
  
     //Alert for empty search box
     function funError() {
       alert("search box  cannot be empty!. Write something")
     }
  
  });
  
  //top navbar toggle
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }