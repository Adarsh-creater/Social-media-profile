import React, { useState } from "react";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faHeart, faShareFromSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons/faHeartCircleCheck";

const Post = (props) => {
  const [posts, setPosts] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    description: "",
    tags: [],
    image: null, // Single image
  });
  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const handleFileChange = (e) => {
    setPostForm({ ...postForm, image: e.target.files[0] }); // Single file
  };

  const handleTagInput = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const trimmedTag = currentTag.trim();
      if (trimmedTag && !postForm.tags.includes(trimmedTag)) {
        setPostForm({ ...postForm, tags: [...postForm.tags, trimmedTag] });
      }
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setPostForm({
      ...postForm,
      tags: postForm.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSave = () => {
    const newPost = {
      ...postForm,
      date: new Date().toLocaleString(),
      isLiked: false, // Initialize with false
    };
    setPosts([...posts, newPost]);
    setIsPopupOpen(false);
    setPostForm({
      description: "",
      tags: [],
      image: null,
    });
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setPostForm({
      description: "",
      tags: [],
      image: null,
    });
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleToggleLike = (index) => {
    const updatedPosts = posts.map((post, i) =>
      i === index ? { ...post, isLiked: !post.isLiked } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <div className="p-4">
      {/* Post Bar */}
      {props.role === "user" && (
        <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-4">
          <div className="flex items-center gap-3">
            <img
              src={props.userImage}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-500">What's in your mind bro?</span>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => setIsPopupOpen(true)}
          >
            Share
          </button>
        </div>
      )}

      {/* Popup Form */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4">Create Post</h2>
            <textarea
              name="description"
              value={postForm.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="border w-full p-2 rounded mb-4"
            ></textarea>
            <div className="border w-full p-2 rounded mb-4">
              <div className="flex flex-wrap gap-2">
                {postForm.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded flex items-center"
                  >
                    {tag}
                    <button
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={currentTag}
                onChange={handleTagInput}
                onKeyDown={handleAddTag}
                placeholder="Add tags and press Enter"
                className="w-full mt-2 p-2 border rounded"
              />
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              className="border w-full p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Post Cards */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div key={index} className="border p-4 rounded shadow space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4 text-gray-500 text-[15px]">
                <img
                  src={props.userImage}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p>
                    <strong className="text-black text-lg">
                      {props.userName}
                    </strong>{" "}
                    <span>{post.date}</span>
                  </p>
                  <ReactReadMoreReadLess
                    charLimit={80}
                    readMoreText={"Read more ▼"}
                    readLessText={"Read less ▲"}
                    readMoreStyle={{
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      color: "#808080",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                    readLessStyle={{
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                      color: "#808080",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {post.description}
                  </ReactReadMoreReadLess>
                  <div className="flex flex-wrap">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="text-blue-500 p-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {props.role === "user" && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              )}
            </div>

            {/* Image */}
            {post.image && (
              <div>
                <img
                  src={URL.createObjectURL(post.image)}
                  alt="Post"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-evenly">
              <button
                className={`px-4 text-white py-2 rounded ${post.isLiked ? "bg-red-500" : "bg-blue-500"
                  }`}
                onClick={() => handleToggleLike(index)}
              >
                {post.isLiked ? (
                  <>
                    <FontAwesomeIcon icon={faHeartCircleCheck} /> Liked
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faHeart} /> Like
                  </>
                )}
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Comment <FontAwesomeIcon icon={faCommentDots} />
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Share <FontAwesomeIcon icon={faShareFromSquare} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
