class DescHelper{

    constructor(){

    }

    static apiDesc(index){

        switch(index){

            case 0:

            let d0 = "This is an intro to my Jersey Rest API, I use this API for many of my projects."
            + " The screenshots of the code below are a part of my Graphics Processing Unit web"
            + " scrapper which you can see in the 'Scanner' section of this website. <br>"
            + "<br> The code contains your basic GET and POST methods to manipulate the database"
            + " with ease. I also like to add a helper string at the begining of each front to"
            + " help me remeber all the paths"
            + " by calling the default http 'gpu_resource'.";

            return d0;

            case 1:

            let d1 = "Here is my (DAO) Data Access Object class, this class creates a connection"
            + " to the database using my ConnectionManager class that is shown in the next screenshot."
            + "<br> <br> Each method contains an appropriate SQL Statement or a Prepared Statement for"
            + " anytime I am inserting or updating data which may prevent an SQL-Injection. I've also"
            + " decided to use JDBC instead of JPA since the Virtual Machine space on the server I'm"
            + " using only has 32mb of memory, my issue could have also been that I was originally"
            + " using spring-boot. (Currently using Jersey)";

            return d1;

            case 2:

            let d2 = "Here is my Connection Class, this is used by all of my Data Access Object"
            + " classes to create a connection. I've made it a enum singleton so that there can only"
            + " be one instance at time."
            + "<br> <br> "
            + "Since my website is using multiple databases, I've added a database string parameter "
            + "which allows me to easily connect to another database without changing the URL string"
            + " manually. I was originally having problems with DriverManager connections hanging, so"
            + " I search online for a solution. Someone suggested I try locking the getConnection()"
            + " to prevent other threads from interfering, this seemed to have fixed the problem.";

            return d2;
        }
    }

    static poolDesc(index){

        switch(index){

            case 0:

            let d0 = "1";

            return d0;

            case 1:

            let d1 = "2"

            return d1;
        }
    }

    static aboutDesc(index){

        switch(index){

            case 0:

            let d0 = "Hello, my name is Dustin, I am a recent graduate (2020) of the Computer Programming"
            + " course at Algonquin College. I love programming and all it's benefits on society, for"
            + " example, I mostly program software that improves my quality of life. Some of these projects"
            + " you can find on my Github or website."
            + "<br> <br>"
            + "Some of my other hobbies consist of electronics repair / builds (Arduino's, micro controllers)"
            + ", video games (I love all types) and dirt biking when the weather is right.";

            return d0;

            case 1:

            let d1 = "2";

            return d1;
        }
    }
}