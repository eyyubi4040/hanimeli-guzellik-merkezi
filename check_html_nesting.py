from html.parser import HTMLParser

VOID_ELEMENTS = {
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
    'link', 'meta', 'param', 'source', 'track', 'wbr', 'iframe'
}

class NestingParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID_ELEMENTS:
            self.tags.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in VOID_ELEMENTS:
            return
        if not self.tags:
            self.errors.append(f"Unexpected closing tag </{tag}> at line {self.getpos()[0]}")
            return
        last_tag, pos = self.tags.pop()
        if last_tag != tag:
            self.errors.append(f"Mismatched tag: opened <{last_tag}> at line {pos[0]} but closed </{tag}> at line {self.getpos()[0]}")
            # put back to try to recover
            self.tags.append((last_tag, pos))

    def check_file(self, filepath):
        self.tags = []
        self.errors = []
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        self.feed(content)
        if self.tags:
            for t, pos in self.tags:
                self.errors.append(f"Unclosed tag <{t}> opened at line {pos[0]}")
        print(f"File: {filepath}")
        if self.errors:
            for err in self.errors:
                print(f"  - {err}")
        else:
            print("  No mismatched tags found.")

if __name__ == "__main__":
    parser = NestingParser()
    for filename in ["index.html", "diot-buz-lazer.html", "kas-kontur-microblading.html", "medikal-cilt-bakimi.html", "pedikur-ve-tirnak-tasarimi.html", "profesyonel-masaj.html"]:
        parser.check_file(filename)
