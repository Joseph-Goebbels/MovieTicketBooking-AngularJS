angular.module('movieTicketApp', [])
  .controller('MovieTicketController', function ($scope) {
    $scope.movies = [
      { title: 'Avengers: Endgame', price: 500 },
      { title: 'Pushpa: The Rise', price: 600 },
      { title: 'Vikram', price: 600 },
      { title: 'Barbie', price: 400 },
      { title: 'Oppenheimer', price: 300 }
    ];

    $scope.selectedMovie = $scope.movies[0];

    $scope.seatLayout = [];
    const numRows = 8;
    const numColumns = 12;
    for (let i = 0; i < numRows; i++) {
      let row = [];
      let numSeats = numColumns - Math.abs((numRows / 2) - i) * 2;
      let startMargin = Math.abs((numRows / 2) - i) * 15;
      for (let j = 0; j < numSeats; j++) {
        row.push({
          label: String.fromCharCode(65 + i) + (j + 1),
          selected: false,
          unavailable: Math.random() < 0.1,
          price: $scope.selectedMovie.price,
          marginLeft: startMargin + 'px'
        });
      }
      $scope.seatLayout.push(row);
    }

    $scope.selectMovie = function(movie) {
      $scope.selectedMovie = movie;
      $scope.calculateSeatLayout();
    };

    $scope.calculateSeatLayout = function() {
      $scope.seatLayout = [];
      const numRows = 8;
      const numColumns = 12;
      for (let i = 0; i < numRows; i++) {
        let row = [];
        let numSeats = numColumns - Math.abs((numRows / 2) - i) * 2;
        let startMargin = Math.abs((numRows / 2) - i) * 15;
        for (let j = 0; j < numSeats; j++) {
          row.push({
            label: String.fromCharCode(65 + i) + (j + 1),
            selected: false,
            unavailable: Math.random() < 0.1,
            price: $scope.selectedMovie.price,
            marginLeft: startMargin + 'px'
          });
        }
        $scope.seatLayout.push(row);
      }
    };

    $scope.toggleSeat = function (seat) {
      if (!seat.unavailable) {
        seat.selected = !seat.selected;
      }
      $scope.calculateTotalPrice();
    };

    $scope.calculateTotalPrice = function () {
      $scope.totalPrice = 0;
      $scope.seatLayout.forEach(row => {
        row.forEach(seat => {
          if (seat.selected) {
            $scope.totalPrice += seat.price;
          }
        });
      });
    };
  });