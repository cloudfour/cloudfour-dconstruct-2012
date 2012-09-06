#!/usr/bin/perl
use FindBin qw($Bin);
use lib "$Bin/../lib";
use Path::Class qw(dir);
use File::Path qw(make_path remove_tree);
use File::Copy;
use File::Find;
use File::stat;
use File::Basename;
use Getopt::Std;

# Get absolute path to directory with this script in it
my $dir = dir($Bin);

# Our 'base path' is two levels higher... use Path::Class for this
my $basepath = $dir->parent->parent;
my $exercise_path = $basepath . "/exercises";

## Settings for this project
my $pandoc = '/usr/local/bin/pandoc';
my $header_file = $basepath . '/assets/header.html';
my $slide_flags  = "-f markdown -t slidy --standalone --css=assets/css/workshop.css --include-in-header=" . $header_file . " --slide-level=2";
my $flat_flags = "-f markdown -t html5 --standalone --table-of-contents --css=assets/css/flat.css";

my $input  = $basepath . "/workshop-part1.content";
my $output = $basepath . "/part1.html";
my $flat_output = $basepath . "/part1-flat.html";

system("$pandoc $slide_flags $input > $output");
system("$pandoc $flat_flags $input > $flat_output");


my $input  = $basepath . "/workshop-part2.content";
my $output = $basepath . "/part2.html";
my $flat_output = $basepath . "/part2-flat.html";

system("$pandoc $slide_flags $input > $output");
system("$pandoc $flat_flags $input > $flat_output");

sub build_exercises {
  if ($_ =~ /\.content/) {
    ($base, $dir, $ext) = fileparse($File::Find::name, '\..*'); # Split path into dir, file basename, extension
    my $output = $dir . '/' . $base . '.html';
    system("$pandoc --from=markdown --to=html5 --standalone --css=../../assets/css/workshop.css --section-divs $_ > $output");
  }
}

find(\&build_exercises, $exercise_path);
