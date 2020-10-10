// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

var fightOrSkip = function() 
{
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Enter the conditional recursive function call here!
    if (!promptFight) 
    {
        window.alert("You need to provide a valid answer! Please try again."); 
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();
  
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") 
    {
        // confirm user wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        // if yes (true), leave fight
        if (confirmSkip) 
        {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            //shop();
            return true;
        }
    }
    return false;
}

// Fight function
var fight = function(enemy) 
{
    // keep track of who goes first
    var isPlayerTurn = true;
  ​
    // randomly change turn order
    if (Math.random() > 0.5) 
    {
        isPlayerTurn = false;
    }
  ​
    while (playerInfo.health > 0 && enemy.health > 0) 
    {
        if (isPlayerTurn) 
        {
            // ask user if they'd like to fight or skip using fightOrSkip function
            if (fightOrSkip()) 
            {
                // if true, leave fight by breaking loop
                break;
            }​
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            // remove enemy's health by subtracting the amount we set in the damage variable
            enemy.health = Math.max(0, enemy.health - damage);
            console.log(
            playerInfo.name +
            " attacked " +
            enemy.name +
            ". " +
            enemy.name +
            " now has " +
            enemy.health +
            " health remaining."
            );
            // check enemy's health
            if (enemy.health <= 0) 
            {
                window.alert(enemy.name + " has died!");
                // award player money for winning
                playerInfo.money = playerInfo.money + 20;
                // leave while() loop since enemy is dead
                break;
            }    
            
            else 
            {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");
            }
        } 
        
        // if player gets attacked first
        else 
        {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
  
            // remove player's health by subtracting the amount we set in the damage variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
            enemy.name +
            " attacked " +
            playerInfo.name +
            ". " +
            playerInfo.name +
            " now has " +
            playerInfo.health +
            " health remaining."
            );
  
            // check player's health
            if (playerInfo.health <= 0) 
            {
                window.alert(playerInfo.name + " has died!");
                // leave while() loop if player is dead
                break;
            } 
            
            else 
            {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
            }
        }
        // switch turn order for next round
        isPlayerTurn = !isPlayerTurn;
    }
};

// function to start a new game
var startGame = function ()
{
    // reset player stats
    playerInfo.reset();
    
    for(var i = 0; i < enemyInfo.length; i++) 
    {
        if (playerInfo.health > 0)
        {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            //debugger;
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (i < enemyInfo.length - 1 && playerInfo.health > 0)
            {
                // ask if user wants to go to the shop before the next round
                var shopConfirm = window.confirm("The fight is over.  visit the store before the next round?")
                

                // if yes, take them to the shop function
                if(shopConfirm)
                {
                    shop();
                }
            }
        }
        

        else 
        {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

// function to end the entire game
var endGame = function()
{
    // if player is still alive, player wins!
    if (playerInfo.health > 0) 
    {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    } 
    else 
    {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) 
    {
        // restart the game
        startGame();
    } 
    else 
    {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// Shop function
var shop = function()
{
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.");

    shopOptionPrompt = parseInt(shopOptionPrompt);
    debugger;
    // use a switch statement to handle the various answers to the prompt
    switch (shopOptionPrompt) 
    {
        // Refil
        case 1:
            playerInfo.refillHealth;
            break;
    
        // Upgrade
        case 2:
            playerInfo.upgradeAttack;
            break;
        
        // Leave
        case 3:
            window.alert("Leaving the store.");
            // Leave: do nothing, so function will end
            break;

        // Default
        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }

}

// function to generate a random numeric value
var randomNumber = function(min, max) 
{
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
};

// Get Player Info function
var getPlayerName = function() 
{
    var name = "";
    
    // ***************************************
    // ADD LOOP HERE WITH PROMPT AND CONDITION
    // ***************************************
    while (name === "" || name === null) 
    {
        name = prompt("What is your robot's name, bitch?");
    }
  
    console.log("Your robot's name is"  + name);
    return name;
};

// Player Info
var playerInfo = 
{
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() 
    {
        if (this.money >= 7) 
        {
          window.alert("Refilling player's health by 20 for 7 dollars.");
          this.health += 20;
          this.money -= 7;
        } 
        else 
        {
          window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() 
    {
        if (this.money >= 7) 
        {
          window.alert("Upgrading player's attack by 6 for 7 dollars.");
          this.attack += 6;
          this.money -= 7;
        } 
        else 
        {
          window.alert("You don't have enough money!");
        }
    }
}

// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

// Enemy Info
var enemyInfo = 
[
    {
      name: "Roborto",
      attack: 10
      //randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: 10
      //randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: 10
      //randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();

