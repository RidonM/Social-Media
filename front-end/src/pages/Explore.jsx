import FriendCard from "../components/FriendCard";

const friends = [
  {
    id: 1,
    name: "John Doe",
    profession: "Software Engineer",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Jane Smith",
    profession: "Graphic Designer",
    img: "https://via.placeholder.com/100",
  },
  {
    id: 3,
    name: "Emily Brown",
    profession: "Content Writer",
    img: "https://via.placeholder.com/100",
  },
  // Add more friend data as needed
];

function Explore() {
  return (
    <>
      <div className="container">
        <header>
          <h1>Explore More</h1>
          <p>Connect with new friends!</p>
        </header>

        <div className="friends-list">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Explore;
