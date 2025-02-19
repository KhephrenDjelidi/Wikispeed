class HelloWorld {
	private greetingMessage: string;
	
	constructor(greetingMessage: string) {
		this.greetingMessage = greetingMessage;
	}
	
	greet() {
		console.log(`Here is a greeting message: ${this.greetingMessage}`);
	}
}

class HelloWorldGreeter extends HelloWorld {
	constructor() {
		super("Hello World");
	}
}

var greeter = new HelloWorldGreeter(); 
greeter.greet();