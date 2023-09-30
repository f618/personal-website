const Arena = require("are.na");
const arenaChannelId = 839706;
const maxImagesToShow = 15;

const getRecentChannelImages = async (channelId) => {
  const arena = new Arena();
  let rootChannel = await arena.channel(channelId).get();
  const channel = rootChannel.contents[0]; // Assuming this is the most recent channel

  let images = [];
  const opts = {
    per: maxImagesToShow,
    sort: "position", // Sort by position (assumes newest images have the highest position)
    direction: "desc", // Sort in descending order (newest first)
  };

  if (channel && channel.base_class === "Channel") {
    const contents = await arena.channel(channel.id).contents(opts);
    images = contents
      .filter((b) => b.image)
      .map((b) => b.image.display.url); // Use b.image.display.url or b.image.original.url for full-sized images
  }

  return images; // Images are returned in reverse chronological order (newest first).
};

const retrievedImages = getRecentChannelImages(arenaChannelId);
retrievedImages.then((images) => {
  console.log("Retrieved Images:", images); // This will log the retrieved images in reverse chronological order (newest first).
});

module.exports = retrievedImages;
