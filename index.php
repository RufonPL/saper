<?php
  $boardWidth = (isset($_GET['boardWidth'])) ? $_GET['boardWidth'] : 5;
  $boardHeight = (isset($_GET['boardHeight'])) ? $_GET['boardHeight'] : 5;
  $bombsNumber = (isset($_GET['bombsNumber'])) ? $_GET['bombsNumber'] : 10;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">
    <link rel="stylesheet" href="css/font-awesome.min.css">

    <title>Saper</title>

    <link href="style.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    <div class="user-sidebar">
 <!--     <p>Board Width: <span id="boardWidth"><?php // echo $boardWidth;?></span></p>
      <p>Board Height: <span id="boardHeight"><?php // echo $boardHeight;?></span></p>
      <p>Number of Bombs: <span id="bombsNumber"><?php // echo $bombsNumber;?></span></p>-->
      <p>Attempt: <span id="attempt">0</span></p>
      <p>Fields: <br/>
        checked: <span id="fieldsChecked">0</span><br/>
        left: <span id="fieldsLeft"><?php echo ($boardWidth * $boardHeight - $bombsNumber);?></span></p>

      <form action="/saper" method="get">
        <h4>Choose game params:</h4>
        <p>Board Width: <input id="boardWidth" type="number" value="<?php echo $boardWidth;?>" name="boardWidth" min="3" max="30"></p>
        <p>Board Heigth: <input id="boardHeight" type="number" value="<?php echo $boardHeight;?>" name="boardHeight" min="3" max="30"></p>
        <p>Number of Bombs: <input id="bombsNumber" type="number" value="<?php echo $bombsNumber;?>" name="bombsNumber" min="5" max="<?php echo round(($boardWidth * $boardHeight) * 0.7);?>"></p>

        <input type="submit" value="Start Game">
      </form>
    </div>

    <div class="board">
      <div id="success">
        <h2>Success!</h2>
        <a href="/saper"><div class="btn btn-success">PLAY AGAIN!</div></a>
      </div>
      <div id="lost">
        <h2>You lost - try again!</h2>
        <a href="/saper"><div class="btn btn-lost">TRY AGAIN!</div></a>
      </div>
        <div class="container">

          <?php
            $index = 1;
            for ($i = 0; $boardHeight > $i; $i++){
              echo '<div class="row-cell">';

              for ($j = 0; $boardWidth > $j; $j++){
                echo '<div id="'.$i.'-'.$j.'" class="cube pos'.$index.'">'.$index.'</div>';
              $index++;
              }

              echo '</div>';
            }
          ?>
        </div>
      </div>
      <footer class="footer">
        <p>made by Myself</p>
      </footer>

    </div> <!-- /container -->

    <script src="main.js"></script>
  </body>
</html>
