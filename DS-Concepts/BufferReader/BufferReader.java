import java.util.*;

import jdk.internal.org.jline.utils.InputStreamReader;

import java.io.*;

public class BufferReader{
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String name = br.readLine();
        System.out.println(name);

        int age = Integer.parseInt(br.readLine());
        System.out.println(age);
    }
}