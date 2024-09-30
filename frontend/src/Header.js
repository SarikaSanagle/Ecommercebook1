
import bgimg from  './images/onlinebookstore.jpg';
import bookimg from  './images/Booksimage.jpg';



function Header() {
  return (
    <div>
      <div style={{ width: 100, height: 50 }}>
        <img src={bgimg} style={{ width: 1348, height: 400, top: 0, left: 0, position: 'relative' }}  alt="OnlineBook"/>
        <h1 style={{ position: 'relative', left: 150, top: -350, color: 'white', width: 100 }}>
          Welcome To Ecommerce Book Shopee</h1>
      </div>
      <div style={{ width: 100, height: 50 }}>
<img src={bookimg} style={{ width: 1348, height: 500, top: 350, position: 'relative' }}  alt="book"/>

</div>

    </div>



  )
}
export default Header;