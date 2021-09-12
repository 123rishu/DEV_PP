import java.util.*;

public class PasswordChecker {

    static int count = 0;
    public static void main(String[] args) {
        if(count < 3){
            count++;
            main(null);
        }
        else{
            return;
        }
        System.out.print(count);
    }

    public static void passwordCheck(String str) {
        int len = str.length();
        int digit = 0;
        int lowerCase = 0;
        int upperCase = 0;
        int special = 0;
        int spaces = 0;
        for (int i = 0; i < str.length(); i++) {
            char ch = str.charAt(i);
            if (Character.isDigit(ch)) {
                digit++;
            } else if (Character.isLowerCase(ch)) {
                lowerCase++;
            } else if (Character.isUpperCase(ch)) {
                upperCase++;
            } else if (str.charAt(i) == ' ') {
                spaces++;
            } else {
                special++;
            }
        }
        if (digit >= 1 && lowerCase >= 1 && upperCase >= 1 && special >= 1 && len >= 8 && spaces == 0) {
            System.out.println("Password is Strong!!");
        } else {
            System.out.println("Password is weak!!");
        }
    }
}
