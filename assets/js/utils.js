export const fillPartialStar = (rating) => {
  // 2 layer (path), front layer clip and show remain part of back layer.
  const starArray = document.querySelectorAll('.star-icon');
  const fullFillStar = Math.floor(rating);
  const partialFillStar = (rating % 1) * 100;
  starArray.forEach((star, index) => {
    const paths = star.querySelectorAll('path');
    if (index < fullFillStar) {
      paths.forEach(path => {
        path.style.fill = 'var(--blue-color)';
      });
    } else if (index === fullFillStar && partialFillStar !== 0) {
      paths[0].style.fill = 'var(--gray-color)';
      paths[0].style.clipPath = `polygon(${partialFillStar}% 0%, 100% 0%, 100% 100%, ${partialFillStar}% 100%)`;
      paths[1].style.fill = 'var(--blue-color)';
      paths[1].style.clipPath = `polygon(0 0, ${partialFillStar}% 0, ${partialFillStar}% 100%, 0 100%)`;
    } else {
      paths.forEach(path => {
        path.style.fill = 'var(--gray-color)';
      });
    }
  });
};
